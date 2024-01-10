import React from 'react'
import { useTranslation} from 'react-i18next';

export const Dashboard = () => {
  const { t, i18n } = useTranslation();
  return (
      <div>{t("main.header")}</div>
  )
}