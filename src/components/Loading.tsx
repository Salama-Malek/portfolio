import React from "react";
import { useTranslation } from "react-i18next";

export default function Loading(): React.ReactElement {
  const { t } = useTranslation();

  return (
    <div id="loading">
      <div className="load-circle" role="status">
        <span className="visually-hidden">{t("loading.aria")}</span>
      </div>
    </div>
  );
}
