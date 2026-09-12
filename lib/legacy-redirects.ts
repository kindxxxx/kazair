export type LegacyRedirect = {
  source: string;
  destination: string;
  statusCode: 301;
  has?: Array<{ type: "query"; key: string; value: string }>;
};

function to(source: string, destination: string): LegacyRedirect {
  return { source, destination, statusCode: 301 };
}

export const legacyRedirects: LegacyRedirect[] = [
  to("/kontakty", "/contacts"),
  to("/servis", "/service"),
  to("/servis-i-obslujivanie", "/service"),
  to("/nashi-partnjory", "/"),
  to("/sredi-nashikh-klientov", "/"),
  to("/component/rsform/form/1-obratnaya-svyaz", "/contacts"),
  to("/component/rsform/:path*", "/contacts"),

  to("/vintovye-kompressory", "/catalog/screw"),
  to("/vintovye-kompressory/:path*", "/catalog/screw"),
  to("/maslonapolnennyj-vintovoj-kompressor-belt-xp", "/catalog/screw/almig-premium"),
  to("/kompressory-serii-gear-xp", "/catalog/screw"),
  to("/novoe-pokolenie-flex", "/catalog/screw"),
  to("/vintovoj-kompressor-s-pryamym-privodom-serii-direct", "/catalog/screw"),
  to("/vintovoj-kompressor-variable-xp-tekhnologiya-scd", "/catalog/screw"),
  to("/vodozapolnennyj-vintovoj-kompressor-serii-lento", "/catalog/screw/oil-free"),
  to("/sistemy-upravleniya", "/catalog/screw"),
  to("/vintovye-kompress-serii-variableory/:path*", "/catalog/screw"),

  to("/peredvizhnye-mobilnye-kompressory", "/catalog/mobile"),
  to("/peredvizhnye-mobilnye-kompressory/:path*", "/catalog/mobile"),

  to("/kompressory-vysokogo-davleniya", "/catalog/hp"),
  to("/kompressory-vysokogo-davleniya/:path*", "/catalog/hp"),
  to("/vysokogo-davleniya-kompressory", "/catalog/hp"),
  to("/vysokogo-davleniya-kompressory/:path*", "/catalog/hp"),
  to("/kompressory-vysokogo-davleniya-dlya-szhatiya-vozdukha", "/catalog/hp"),
  to("/kompressory-dlya-szhatiya-gazov", "/catalog/gas"),
  to("/dozhimnye-kompressory", "/catalog/hp"),
  to("/dozhimnye-kompressory-serii-mistral", "/catalog/hp/sauer-air-n2"),
  to("/kompressory-passat-15-40-bar", "/catalog/hp/sauer-air-n2"),
  to("/kompressory-serii-6000", "/catalog/hp/sauer-air-n2"),
  to("/kompressory-serii-mistral-2-stupeni-szhatiya-vozdushnoe-okhlazhdenie", "/catalog/hp/sauer-air-n2"),
  to("/kompressory-serii-passat-3-stupeni-szhatiya-vozdushnoe-okhlazhdenie", "/catalog/hp/sauer-air-n2"),
  to("/kompressory-serii-typhoon-2-stupeni-szhatiya-vodyanoe-okhlazhdenie", "/catalog/hp/sauer-air-n2"),
  to("/porshnevye-kompressory-vysokogo-davleniya-serii-5000-50-350-bar", "/catalog/hp/sauer-air-n2"),
  to("/porshnevye-kompressory-vysokogo-davleniya-serii-6000-50-500-bar", "/catalog/hp/sauer-air-n2"),
  to("/porshnevye-kompressory-vysokogo-davleniya-serii-hurricane-100-230-bar", "/catalog/hp/sauer-air-n2"),
  to("/porshnevye-kompressory-vysokogo-davleniya-serii-hurricane-90-400-bar", "/catalog/hp/sauer-air-n2"),
  to("/porshnevye-kompressory-vysokogo-davleniya-serii-mistral-8-40-bar", "/catalog/hp/sauer-air-n2"),
  to("/porshnevye-kompressory-vysokogo-davleniya-serii-passat-10-80-bar", "/catalog/hp/sauer-air-n2"),
  to("/porshnevye-kompressory-vysokogo-davleniya-serii-tornado-100-230-bar", "/catalog/hp/sauer-air-n2"),
  to("/porshnevye-kompressory-vysokogo-davleniya-serii-tornado-50-420-bar", "/catalog/hp/sauer-air-n2"),
  to("/porshnevye-kompressory-vysokogo-davleniya-serii-typhoon-10-100-bar", "/catalog/hp/sauer-air-n2"),
  to("/puskovye-kompressory", "/catalog/hp"),
  to("/paneli-upravleniya", "/catalog/hp"),

  to("/turbokompressory", "/catalog/turbo"),
  to("/turbokompressory/:path*", "/catalog/turbo"),
  to("/turbokompressory-tsentrobezhnye-kompressory", "/catalog/turbo"),
  to("/turbokompressor-hanwha-power-systems-co-samsung-do-2015-goda-techwin-serii-sm-sme-2000-6000", "/catalog/turbo"),
  to("/turbokompressory-hanwha-power-systems-co-samsung-do-2015-goda-sa-2000-sa-3100", "/catalog/turbo"),
  to("/turbokompressory-hanwha-power-systems-co-samsung-do-2015-goda-sm7000-sm-8000", "/catalog/turbo"),
  to("/sistema-upravleniya-turbokompressorami-hanwha-power-systems-co-samsung-do-2015-goda-techwin-touch-plus", "/catalog/turbo"),

  to("/blochno-modulnye-kompressornye-stantsii-mks", "/catalog/mks"),

  to("/szhatogo-vozdukha-osushiteli", "/catalog/dryers"),
  to("/szhatogo-vozdukha-osushiteli/:path*", "/catalog/dryers"),
  to("/osushiteli-szhatogo-vozdukha", "/catalog/dryers"),
  to("/osushiteli-szhatogo-vozdukha/:path*", "/catalog/dryers"),
  to("/osushiteli-hre-hrg-hrs", "/catalog/dryers/dryer-hre"),
  to("/osushiteli-serii-buran", "/catalog/dryers/dryer-ref"),
  to("/osushiteli-ultrapac-classic", "/catalog/dryers"),
  to("/osushiteli-ultrapac-classic-2000", "/catalog/dryers"),

  to("/filtry-i-filtr-elementy", "/catalog/filters"),
  to("/filtry-i-filtr-elementy/:path*", "/catalog/filters"),
  to("/filtr-elementy-i-filtry", "/catalog/filters"),
  to("/industrialnye-filtry", "/catalog/filters"),
  to("/protsessnye-filtry", "/catalog/filters/filters-process"),
  to("/rukavnye-filtry", "/catalog/filters"),
  to("/filtroelementy-dlya-korpusov-ag-sg", "/catalog/filters"),
  to("/filtroelementy-dlya-korpusov-df", "/catalog/filters"),
  to("/vidy-kontsevykh-adapterov-filtrov", "/catalog/filters"),

  to("/dizelnye-elektrostantsii-dgu-des", "/catalog/generators"),
  to("/vozdukhosborniki-resivery", "/catalog/receivers"),
  to("/resivery-vozdukhosborniki", "/catalog/receivers"),
  to("/pages/kompressory-agnks-i-azs-spg", "/catalog/gas"),
  to("/raskhodnye-materialy-i-zapasnye-chasti", "/catalog/parts"),
  to("/zapasnye-chasti-i-raskhodnye-materialy", "/catalog/parts"),

  to("/kk", "/"),
  to("/kk/", "/"),
  to("/kk/kontakty-3-kaz", "/contacts"),
  to("/kk/pages-3/servis-i-obslujivanie-kaz", "/service"),
  to("/kk/pages-3/dizelnye-elektrostantsii-dgu-des-kaz", "/catalog/generators"),
  to("/kk/pages-3/kompressory-agnks-i-azs-spg-kaz", "/catalog/gas"),
  to("/kk/blochno-modulnye-kompressornye-stantsii-mks-kaz", "/catalog/mks"),
  to("/kk/filtr-elementy-i-filtry-kaz", "/catalog/filters"),
  to("/kk/filtroelementy-dlya-korpusov-df-kaz", "/catalog/filters"),
  to("/kk/peredvizhnye-mobilnye-kompressory-kaz", "/catalog/mobile"),
  to("/kk/raskhodnye-materialy-i-zapasnye-chasti-kaz", "/catalog/parts"),
  to("/kk/szhatogo-vozdukha-osushiteli-kaz", "/catalog/dryers"),
  to("/kk/turbokompressory-tsentrobezhnye-kompressory-kaz1", "/catalog/turbo"),
  to("/kk/vozdukhosborniki-resivery-kaz", "/catalog/receivers"),

  {
    source: "/index.php",
    destination: "/catalog/gas",
    statusCode: 301,
    has: [{ type: "query", key: "id", value: "27" }],
  },
  {
    source: "/index.php",
    destination: "/catalog",
    statusCode: 301,
    has: [{ type: "query", key: "id", value: "22" }],
  },
  to("/index.php", "/"),
];
