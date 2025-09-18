export const ITEMS_PER_PAGE = 10; // define el numero de pagina para las tablas
export const SEARCH_PARAM_ATTR_NAME = 'q'; // define el atributo usado para buscar, q=valor_a_buscar
export const SEARCH_PARAM_PATH = '_search'; // define el path para los endpoint de busqueda, ej: endpoint/_search?q=valor_a_buscar
export const CURRENT_USER_KEY = 'currentUser';
export const CURRENT_DATE = 'currentDate';
export const AUTHORIZATION_HEADER = 'Authorization';
export const SESSION_TIME_LIMIT_IN_SECONDS = 600; // 10 minutos
export const ENABLED_TRACING = false;
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { month: 'numeric', year: 'numeric' },
    dateA11yLabel: { day: 'numeric', month: 'long', year: 'numeric' },
    monthYearA11yLabel: { month: 'long', year: 'numeric' },
  },
};

export const CONSTANTES_MODULOS_FUNCIONALIDAD = {
  tro_aportes: 'tro.aportes',
  tro_default: 'tro.default',
};

// Restricciones y valores por defectos para formularios de reporte
export const MIN_CUENTA_DESDEHASTA = 1;
export const MAX_CUENTA_DESDEHASTA = 8;
export const MIN_CANTIDAD_DESDEHASTA = 1;
export const MAX_CANTIDAD_DESDEHASTA = 8;
export const MIN_LOTE_DESDEHASTA = 1;
export const MAX_LOTE_DESDEHASTA = 8;
export const MIN_REGISTRO_DESDEHASTA = 1;
export const MAX_REGISTRO_DESDEHASTA = 6;
export const MIN_IMPORTE_MINIMO = 1;
export const MAX_IMPORTE_MINIMO = 9;
export const MAX_MIN_LENGTH_CUIT = 11;
export const MIN_SUBTIPO = 1;
export const MAX_SUBTIPO = 2;
export const MIN_DOCUMENTO = 100000;
export const MAX_DOCUMENTO = 99999999999;

export const DEFAULT_CUENTA_DESDE = 1;
export const DEFAULT_CUENTA_HASTA = 99999999;
export const DEFAULT_CANTIDAD_DESDE = 1;
export const DEFAULT_CANTIDAD_HASTA = 99999999;
export const DEFAULT_LOTE_DESDE = 1;
export const DEFAULT_LOTE_HASTA = 99999999;
export const DEFAULT_REGISTRO_DESDE = 1;
export const DEFAULT_REGISTRO_HASTA = 999999;
export const DEFAULT_IMPORTE_MINIMO = 0;
export const DEFAULT_SUBTIPO_DESDE = 1;
export const DEFAULT_SUBTIPO_HASTA = 99;

export const PATTERN_ONLYNUMBER = '^[0-9]*$';
