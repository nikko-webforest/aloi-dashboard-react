// group = grouping fields
// categorization/category =

const includeGenericOptions = (schema, uischema, options) => {
  if (options.label || options.label !== false) {
    uischema.label = options.label;
  }

  if (options.helperText) {
    schema.description = options.helperText;
  }

  if (options.readOnly) {
    uischema.options.readonly = !!options.readOnly;
  }

  return { schema, uischema };
};

// @todo proper camel casing
const normalizeName = (name) => {
  const tokens = name.replaceAll(/[^a-z0-9\-_ ]/gi, "").split(" ");

  if (tokens.length === 1) return tokens[0].charAt(0).toLowerCase() + tokens[0].slice(1);

  return tokens
    .map((t, i) => {
      if (i === 0) t = t.toLowerCase();
      if (i !== 0) t = t.charAt(0).toUpperCase() + t.slice(1);
      return t;
    })
    .join("");

  return name
    .toLowerCase()
    .replaceAll(/[^a-z0-9\-_ ]/gi, "")
    .replaceAll(" ", "_");
};

const isObject = (o) => typeof o === "object" && !Array.isArray(o) && o !== null;

const prependScope = (uischema, scope) => {
  // console.log("prepend", { element, scope });

  if ("elements" in uischema) {
    for (const e in uischema.elements) {
      uischema.elements[e] = prependScope(uischema.elements[e], normalizeName(scope));
    }

    return uischema;
  }

  return {
    ...uischema,
    scope: uischema.scope.replace(/^#/, `#/properties/${normalizeName(scope)}`)
  };
};

const mergeFieldSchemas = (fields) => {
  const schema = {
    type: "object",
    properties: {}
  };

  fields.forEach((field) => {
    const props =
      field.uischema.type === "Control"
        ? { [normalizeName(field.name)]: { ...field.schema } }
        : field.schema.properties;

    schema.properties = { ...schema.properties, ...props };

    return field;
  });

  return schema;
};

export const prependFieldsScope = (fields, label) => {
  return fields.map((field) => {
    if (field.uischema.type === "Control") {
      field.uischema = prependScope(field.uischema, label);
    }

    if ("elements" in field.uischema) {
      field.uischema.elements = field.uischema.elements.map((e) => {
        return prependScope(e, label);
      });
    }

    return field;
  });
};

export const Group = (fields, label, options) => {
  if (!label) {
    throw new Error("Group label is required");
  }

  const defaultOptions = {
    updateSchema: true
  };

  const o = {
    ...defaultOptions,
    ...options
  };

  const schema = {
    type: "object",
    properties: {}
  };

  const uischema = {
    type: "Group",
    label,
    elements: [...fields.map((f) => f.uischema)]
  };

  const mergedSchemas = mergeFieldSchemas(fields);
  const scopedFields = prependFieldsScope(fields, label);

  schema.properties = { ...mergedSchemas.properties };

  if (o.updateSchema) {
    uischema.elements = [...scopedFields.map((f) => f.uischema)];
    schema.properties = { [normalizeName(label)]: { ...schema } };
  }

  return { name: label, schema, uischema };
};

export const Form = (fields, options) => {
  const name = `form-${Math.random() * 10 ** 6}`;

  const defaultOptions = {
    isRow: false
  };

  const o = {
    ...defaultOptions,
    ...options
  };

  const type = o.isRow ? "HorizontalLayout" : "VerticalLayout";

  const schema = {
    type: "object",
    properties: {}
  };

  const uischema = {
    type,
    elements: []
  };

  // @todo refactor
  for (const field of fields) {
    if (Array.isArray(field)) {
      const { schema: row, uischema: uirow } = Form(field, { isRow: true });
      uischema.elements.push(uirow);
      schema.properties = { ...schema.properties, ...row.properties };
      continue;
    }

    if (field.uischema.type === "Control") {
      schema.properties = { ...schema.properties, [normalizeName(field.name)]: { ...field.schema } };
    }

    if (field.uischema.type !== "Control") {
      schema.properties = { ...schema.properties, ...field.schema.properties };
    }

    uischema.elements.push({ ...field.uischema });
  }

  return { name, schema, uischema };
};

export const Text = (name, options) => {
  const defaultOptions = {
    label: name,
    key: null
  };

  const o = { ...defaultOptions, ...options };
  const scope = o.key ? o.key : normalizeName(name);

  const schema = {
    type: "string"
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`
  };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const Number = (name, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name
  };

  const schema = {
    type: "integer"
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`
  };

  const o = { ...defaultOptions, ...options };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const TextArea = (name, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name
  };

  const schema = {
    type: "string"
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`,
    options: {
      multi: true
    }
  };

  const o = { ...defaultOptions, ...options };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const Date = (name, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name
  };

  const schema = {
    type: "string"
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`,
    options: {
      format: "date"
    }
  };

  const o = { ...defaultOptions, ...options };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const Time = (name, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name
  };

  const schema = {
    type: "string"
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`,
    options: {
      format: "time"
    }
  };

  const o = { ...defaultOptions, ...options };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const DateTime = (name, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name
  };

  const schema = {
    type: "string"
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`,
    options: {
      format: "date-time"
    }
  };

  const o = { ...defaultOptions, ...options };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const Checkbox = (name, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name
  };

  const schema = {
    type: "boolean"
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`
  };

  const o = { ...defaultOptions, ...options };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const Toggle = (name, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name
  };

  const schema = {
    type: "boolean"
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`,
    options: {
      toggle: true
    }
  };

  const o = { ...defaultOptions, ...options };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const Dropdown = (name, list, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name
  };

  const schema = {
    type: "string",
    enum: [...list]
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`
  };

  const o = { ...defaultOptions, ...options };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const Radio = (name, list, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name
  };

  const schema = {
    type: "string",
    enum: [...list]
  };
  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`,
    options: {
      format: "radio"
    }
  };

  const o = { ...defaultOptions, ...options };

  if (o.minLength) {
    schema.minLength = o.minLength;
  }

  if (o.maxLength) {
    schema.maxLength = o.maxLength;
  }

  if (o.default) {
    schema.default = o.default;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema, uischema };
};

export const Slider = (name, options) => {
  const scope = normalizeName(name);
  const defaultOptions = {
    label: name,
    minimum: 0,
    maximum: 100
  };

  const o = { ...defaultOptions, ...options };

  const schema = {
    type: "integer",
    minimum: o.minimum,
    maximum: o.maximum,
    default: o.default
  };

  const uischema = {
    type: "Control",
    scope: `#/properties/${scope}`,
    options: {
      slider: true
    }
  };

  if (!schema.default) {
    schema.default = schema.maximum / 2;
  }

  includeGenericOptions(schema, uischema, o);

  return { name: scope, schema: { ...schema }, uischema: { ...uischema } };
};
