import NavLink from "next/link";

let Link = ({ link, dir = "row", ...linkOpts }) => {
  return (
    <>
      <NavLink {...linkOpts}>
        <a {...{ dir }}>
          <div>{link}</div>
        </a>
      </NavLink>
      <style jsx>{`
        a {
          color: currentColor;
          transition: 0.3s;
        }
        a:hover {
          color: var(--link);
        }
        // row
        a[dir="row"] {
          padding: 10px 0;
        }
        a[dir="row"] div {
          padding: 0 10px;
          border-right: 1px solid var(--label);
        }
        a[dir="row"]:last-child div {
          border-right: 0;
        }
        // column
        a[dir="col"] {
          padding: 0 10px 0 32px;
        }
        a[dir="col"] div {
          border-bottom: 1px solid var(--label);
          padding: 10px 0;
        }
        a[dir="col"]:last-child div {
          border-bottom: 0;
        }
      `}</style>
    </>
  );
};

export default Link;
