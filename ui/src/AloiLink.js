import { useAloiContext } from "./AloiProvider";
import { Link as RouterLink } from "react-router-dom"

const DefaultLink = ({ href, ...props }) => {
  return <RouterLink {...props} to={href} />;
};

export const AloiLink = (props) => {
  const { href, external, ...other } = props;
  const aloi = useAloiContext();

  const LinkComponent = aloi.linkComponent || DefaultLink;

  if (external || /^(?:[a-z][a-z\d+.-]*:|\/\/)/.test(href)) {
    other.target = "_blank";
    other.rel = "noopener noreferrer";
    return <a {...other} href={href}>{props.children}</a>;
  }

  return (
    <LinkComponent {...other} href={aloi.realm.generateUrl(href)}>
      {props.children}
    </LinkComponent>
  );
};
