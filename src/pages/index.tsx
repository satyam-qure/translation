import { Inter } from "@next/font/google";
import { useTranslation } from "react-i18next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <p>{t("dashboard")}</p>
      <p>{t("worklist")}</p>
    </>
  );
}
