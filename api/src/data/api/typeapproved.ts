import { PaginatedResult } from './general'

export const TYPE_APPROVED_URL = 'https://hotell.difi.no/api/json/vegvesen/typg'

export type TypeApproved = {
  bredde: string
  motormerking: string
  eu_hovednummer: string
  std_dekk_foran: string
  till_foraksellast: string
  ramme_karosseri: string
  sitteplasser: string
  min_li_bak: string
  co2_utslipp: string
  min_innpress_bak: string
  typebetegnelse: string
  drivende_hjul: string
  euronorm_ny: string
  variant: string
  partikkelutslipp: string
  till_bakaksellast: string
  fab_mont_partikkelfilter: string
  max_taklast: string
  slagvolum: string
  tilhengervekt_u_brem: string
  antall_aksler: string
  vognkort_anm: string
  identitet_anm: string
  hybrid: string
  egenvekt: string
  max_belastning_h_feste: string
  totalvekt: string
  drivstoff_forbruk: string
  girkasse: string
  merkekode: string
  drivstoff: string
  lengde_til_tilhkobling: string
  modellbetegnelse: string
  min_hast_bak: string
  kjoretoygruppe: string
  min_hast_foran: string
  std_felg_bak: string
  std_felg_foran: string
  maks_sporv_bak: string
  stand_dba: string
  hybrid_kategori: string
  motorytelse: string
  typegodkjenningsnr: string
  gyldig_fra_unr: string
  versjon: string
  antall_aksler_drift: string
  vogntogvekt: string
  ytelsesmaal: string
  omdreininger: string
  nox_utslipp: string
  tilhengervekt_m_brems: string
  lengde: string
  maks_sporv_foran: string
  min_li_foran: string
  min_innpress_foran: string
  std_dekk_bak: string
}

export interface TypeApprovedResult extends PaginatedResult {
  entries: TypeApproved[]
}
