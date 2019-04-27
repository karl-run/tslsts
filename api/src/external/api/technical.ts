import { BASE_URL, IndividualCar, PaginatedResult } from './general'

export const TECHNICAL_URL = `${BASE_URL}/tekn`

export interface TechnicalType extends IndividualCar {
  bredde: string
  sporvidde_foran: string
  std_dekk_foran: string
  sitteplasser: string
  min_li_bak: string
  min_innpress_bak: string
  typebetegnelse: string
  euronorm_ny: string
  partikkelutslipp: string
  eu_variant: string
  fab_mont_partikkelfilter: string
  max_belastning_h_fest: string
  max_taklast: string
  tilhengervek_m_brems: string
  slagvolum: string
  akseltrykk_bak: string
  antall_aksler: string
  hybrid: string
  egenvekt: string
  sporvidde_bak: string
  totalvekt: string
  tilhengervekt_u_brems: string
  drivstoff_forbruk: string
  merkekode: string
  euronorm: string
  drivstoff: string
  lengde_til_tilhkobling: string
  modellbetegnelse: string
  co2_utslippp: string
  eu_versjon: string
  akseltrykk_foran: string
  min_hast_bak: string
  kjoretoygruppe: string
  min_hast_foran: string
  std_felg_bak: string
  std_felg_foran: string
  hybrid_kategori: string
  motorytelse: string
  antall_aksler_drift: string
  vogntogvekt: string
  ytelsesmaal: string
  nox_utslipp: string
  lengde: string
  min_li_foran: string
  min_innpress_foran: string
  std_dekk_bak: string
}

export type TechnicalResult = PaginatedResult<TechnicalType>
