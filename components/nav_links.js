import { app_name, home_links } from "lib/variables";

import Link from "components/link";

export default function Links({
  title = app_name,
  links = home_links,
  dir = "row",
  props,
  ...Oprops
}) {
  return (
    <>
      <div className={"links "+dir} {...Oprops}>
        {Object.entries(links).map(([link, href], id) => (
          <Link key={"nav-link-" + id} {...{ link, href, dir }} {...props} />
        ))}
      </div>
      <style jsx>{`
        div {
          --label: #ffffffff;
          --systemBackground: #000000ff;
        }
        div {
          display: flex;
          color: var(--label);
          background-color: var(--systemBackground);
        }

        div.col {
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
