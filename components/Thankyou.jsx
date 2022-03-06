import Link from "next/link";

import useTranslation from "@locales/useTranslation";

export default function Thankyou() {
  const { t } = useTranslation();

  return (
    <div className="jumbotron text-center">
      <h2 className="display-3">{t("label.thankyou")}</h2>
      <p className="lead">{t("label.thankyouDescription")}</p>
      <p>
        {t("label.trouble")} <a href="#">{t("label.contactUs")}</a>
      </p>
      <p className="lead">
        <Link className="btn btn-primary btn-sm" href="/">
          {t("label.toHome")}
        </Link>
      </p>
      <hr />
    </div>
  );
}
