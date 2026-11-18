export interface FaqItem {
  question: string;
  answer: string[];
  noteVariant?: 'home' | 'detail';
}

export interface PolicyItem {
  id: string;
  title: string;
  paragraphs: string[];
}

export const FAQS: FaqItem[] = [
  {
    question: '¿Cuál es el horario de check-in y check-out?',
    answer: [
      'El horario de check-in o entrada es de 12:00 a 14:00 y de 17:00 a 22:00 h.',
      'El horario de check-out o salida es a las 12:00h.*',
      '*Pasados 10 minutos de la hora del check out sin justificación, el propietario se reserva el derecho de poder cobrar un día completo, sin derecho a pernoctar.',
    ],
  },
  {
    question: '¿Hay aparcamiento?',
    answer: [
      'Sí, ofrecemos aparcamiento gratuito en el establecimiento para todos los huéspedes.',
    ],
  },
  {
    question: '¿Se admiten mascotas?',
    answer: ['Sí, se admiten mascotas bajo un suplemento adicional.'],
  },
  {
    question: '¿Puedo solicitar una cuna para mi bebé?',
    answer: [
      'Sí, disponemos de cunas gratuitas bajo petición previa. Es necesario indicarlo al hacer la reserva para garantizar su disponibilidad.',
    ],
  },
  {
    question: '¿Puedo cancelar mi estancia?',
    answer: [
      '-El cliente puede cancelar la reserva hasta 14 días antes de la fecha de llegada y el importe del anticipo no se devolverá en concepto de gastos de gestión.',
      '-El cliente tendrá que pagar el precio total de la reserva si cancela durante los 14 días antes de la fecha de llegada.',
      '-Si el cliente no se presenta, tendrá que pagar el precio TOTAL de la reserva.',
      '-En temporada Alta o con fechas NO REEMBOLSABLES, se cobrará el 100% de la reserva.',
    ],
  },
  {
    question: '¿Hay atención al cliente durante todo el día?',
    answer: [
      'Sí, estamos disponibles de Lunes a Domingo de 9:00h a 14:00h y de 17:00h a 22:00h (en recepción general hasta las 21:00h). Salvo urgencias: atención 24/7 solo para emergencias.',
    ],
  },
  {
    question: '¿Se pueden hacer barbacoas en el alojamiento?',
    answer: [
      'Sí, está permitido hacer barbacoas en nuestras instalaciones, pero únicamente utilizando carbón vegetal.',
      '*Excepto en Muralla I la cual no cuenta con barbacoa.',
    ],
  },
  {
    question: '¿La piscina es de uso privado o compartido? / ¿Qué horarios tiene?',
    answer: [
      'Contamos con una piscina de uso exclusivo compartido para todos nuestros huéspedes.',
      'El horario de uso de la piscina es 11:30 a 20:30. *Solo disponible en temporada de verano.',
      '*No disponible en las casas Muralla I y Muralla II.',
    ],
  },
  {
    question: '¿El alojamiento incluye ropa de cama y toallas?',
    answer: [
      'Sí, los alojamientos incluyen sábanas, toallas y artículos básicos como papel higiénico, sal, azúcar, entre otros.',
    ],
  },
];

export const USAGE_POLICIES: PolicyItem[] = [
  {
    id: 'checkin-checkout',
    title: 'Check-in y check-out',
    paragraphs: [
      'El horario de check-in o entrada es de 12:00 a 14:00 y de 17:00 a 22:00 h.',
      'El horario de check-out o salida es a las 12:00h.*',
      '*Pasados 10 minutos de la hora del check out sin justificación, el propietario se reserva el derecho de poder cobrar un día completo, sin derecho a pernoctar.',
    ],
  },
  {
    id: 'cancelacion',
    title: 'Cancelación',
    paragraphs: [
      '-El cliente puede cancelar la reserva hasta 14 días antes de la fecha de llegada y el importe del anticipo no se devolverá en concepto de gastos de gestión.',
      '-El cliente tendrá que pagar el precio total de la reserva si cancela durante los 14 días antes de la fecha de llegada.',
      '-Si el cliente no se presenta, tendrá que pagar el precio TOTAL de la reserva.',
      '-En temporada Alta o con fechas NO REEMBOLSABLES, se cobrará el 100% de la reserva.',
    ],
  },
  {
    id: 'mascotas',
    title: 'Mascotas',
    paragraphs: ['Sí, se admiten mascotas bajo un suplemento adicional.'],
  },
  {
    id: 'fumadores',
    title: 'Política Fumadores',
    paragraphs: ['Esta totalmente prohibido fumar dentro de las estancias.'],
  },
];

export const HOUSE_RULES = {
  title: 'NORMAS DEL ALOJAMIENTO',
  subtitle: 'Guest Rules',
  intro:
    'Con el fin de garantizar una estancia segura, agradable y respetuosa para todos, agradecemos que tenga en cuenta las siguientes normas durante su visita:',
  rules: [
    {
      number: '1',
      title: '1. El horario de check-in y check-out:',
      text: 'Es de 12:00 h a 12:00 h. Pasados 10 minutos sin autorización, el propietario se reserva el derecho de cobrar un día adicional, sin que ello otorgue derecho a pernoctación.',
    },
    {
      number: '2',
      title: '2. Ocupación:',
      text: 'No está permitido el acceso o la estancia de personas no registradas, ni la recepción de visitas sin previa autorización del propietario.',
    },
    {
      number: '3',
      title: '3. Cuidado de las instalaciones:',
      text: 'Se ruega mantener en buen estado el interior, exterior y zonas comunes (columpios, mobiliario, barbacoas, jardines, etc.). El cliente será responsable de cualquier daño o desperfecto causado durante su estancia. Es obligatorio respetar la normativa legal vigente sobre niveles de ruido.',
    },
    {
      number: '4',
      title: '4. Responsabilidad por daños:',
      text: 'El propietario no se responsabiliza de daños o perjuicios derivados del uso negligente de las instalaciones. El cliente asume la responsabilidad directa por los mismos.',
    },
    {
      number: '5',
      title: '5. Acceso al personal autorizado:',
      text: 'El propietario podrá acceder a las zonas de viñedo y exteriores para mantenimiento, ya que únicamente se alquilan las casas y las áreas comunes habilitadas (piscina, mesas, barbacoa).',
    },
    {
      number: '6',
      title: '6. Uso de la barbacoa:',
      text: 'Únicamente está permitido el uso de carbón vegetal. Tras su uso, la zona deberá quedar completamente limpia y recogida.',
    },
    {
      number: '7',
      title: '7. Prohibiciones:',
      text: 'Está terminantemente prohibido: Fumar en el interior de las casas, trasladar el mobiliario interior al exterior, usar confeti, globos de agua, petardos o artefactos similares. El incumplimiento conllevará una penalización económica de 150 €.',
    },
    {
      number: '8',
      title: '8. Piscina:',
      text: 'Uso bajo responsabilidad del cliente (no hay socorrista). Respete las normas y horario. Cualquier incumplimiento puede suponer el cierre de la instalación.',
    },
    {
      number: '9',
      title: '9. Mascotas:',
      text: 'Se deberá recoger y desechar adecuadamente los excrementos del animal, así como asumir cualquier gasto por daños ocasionados por el mismo.',
    },
    {
      number: '10',
      title: '10. Uso de toallas:',
      text: 'Exclusivamente para el uso personal. En caso de deterioro por uso indebido (limpieza de calzado, maquillaje, etc.), se aplicará un cargo adicional.',
    },
    {
      number: '11',
      title: '11. Garantía por desperfectos:',
      text: 'Se solicitará una tarjeta de crédito como garantía, pudiendo aplicarse una pre-autorización para cubrir posibles daños.',
    },
  ],
  closingWarning:
    'El incumplimiento de cualquiera de estas normas podrá implicar la intervención de las autoridades, la expulsión del alojamiento sin derecho a reembolso y la aplicación de penalizaciones económicas.',
  closingThanks: 'Agradecemos su colaboración y comprensión.',
};

export const COOKIES_POLICY = {
  title: 'Política de Cookies',
  updatedAt: 'Fecha Actualizada: Octubre 2025',
  paragraphs: [
    'GREGORIO MARCOS MINGUEZ, a través del presente documento, recoge su Política de recogida y tratamiento de cookies, en cumplimiento de lo dispuesto en el artículo 22.2 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico.',
  ],
  sections: [
    {
      heading: 'Definición y función de las cookies',
      paragraphs: [
        '¿Qué son las cookies? Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.',
        'La presente Política de Cookies será de aplicación a aquellos usuarios que voluntariamente visitan las páginas web de GREGORIO MARCOS MINGUEZ, cumplimentan formularios de recogida de datos, o utilizan cualquier otro servicio presente en el sitio web que implique la comunicación de datos, o el acceso a datos para la prestación de sus servicios.',
        'GREGORIO MARCOS MINGUEZ informa a los usuarios de sus páginas web, de la existencia de cookies y pone a su disposición la presente Política con la finalidad de informarles acerca del uso y del objeto de las mismas. El hecho de continuar la navegación a través de sus páginas, supone el conocimiento y la aceptación de la presente Política por parte de dichos usuarios.',
      ],
    },
    {
      heading: 'Tipos de cookies según su finalidad. Podemos distinguir entre:',
      paragraphs: [
        '– Cookies técnicas: Son aquéllas que permiten al usuario la navegación a través de una página web, plataforma o aplicación y la utilización de las diferentes opciones o servicios que en ella existan como, por ejemplo, controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido, realizar la solicitud de inscripción o participación en un evento, utilizar elementos de seguridad durante la navegación, almacenar contenidos para la difusión de videos o sonido o compartir contenidos a través de redes sociales.',
        '– Cookies de personalización: Son aquéllas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio, la configuración regional desde donde accede al servicio, etc.',
        '– Cookies de análisis: Son aquéllas que permiten al responsable de las mismas, el seguimiento y análisis del comportamiento de los usuarios de los sitios web a los que están vinculadas. La información recogida mediante este tipo de cookies se utiliza en la medición de la actividad de los sitios web, aplicación o plataforma y para la elaboración de perfiles de navegación de los usuarios de dichos sitios, aplicaciones y plataformas, con el fin de introducir mejoras en función del análisis de los datos de uso que hacen los usuarios del servicio. Respecto al tratamiento de datos recabados a través de las cookies de análisis, el grupo de trabajo del articulo 29 ha manifestado que, a pesar de que no están exentas del deber de obtener un consentimiento informado para su uso, es poco probable que representen un riesgo para la privacidad de los usuarios siempre que se trate de cookies de primera parte, que traten datos agregados con una finalidad estrictamente estadística, que se facilite información sobre sus uso y se incluya la posibilidad de que los usuarios manifiesten su negativa sobre su utilización.',
        '– Cookies publicitarias: Son aquéllas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado en base a criterios como el contenido editado o la frecuencia en la que se muestran los anuncios.',
        '– Cookies de publicidad comportamental: Son aquéllas que permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios que, en su caso, el editor haya incluido en una página web, aplicación o plataforma desde la que presta el servicio solicitado. Estas cookies almacenan información del comportamiento de los usuarios obtenida a través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil específico para mostrar publicidad en función del mismo.',
        'En cualquier caso, los usuarios pueden configurar su navegador, de manera que se deshabilite o bloquee la recepción de todas o algunas de las cookies. El hecho de no desear recibir estas cookies, no constituye un impedimento para poder acceder a la información de los sitios web, aunque el uso de algunos servicios podrá ser limitado. Si una vez otorgado el consentimiento para la recepción de cookies, se desease retirar éste, se deberán eliminar aquellas almacenadas en el equipo del usuario, a través de las opciones de los diferentes navegadores.',
        'Firefox: http://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-?redirectlocale=en-US&redirectslug=Cookies',
        'Chrome: https://support.google.com/chrome/answer/95647?hl=es',
        'Explorer: http://windows.microsoft.com/es-es/windows7/how-to-manage-cookies-in-internet-explorer-9',
        'Safari: http://translate.google.com/translate?hl=en&sl=en&tl=es&u=http%3A%2F%2Fsupport.apple.com%2Fkb%2Fph5042',
        'GREGORIO MARCOS MINGUEZ modificará la presente Política de cookies siempre que se produzcan cambios en la configuración y/o utilización de las mismas, publicando su versión actualizada en sus sitios web.',
      ],
    },
  ],
};

export const PRIVACY_POLICY = {
  title: 'Política de privacidad y aviso legal',
  updatedAt: 'Fecha Actualizada: Mayo 2025',
  intro:
    'En Finca Entreviñedos, estamos comprometidos con proteger tu privacidad y garantizar una experiencia en línea segura. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información cuando visitas nuestro sitio web o reservas una estancia con nosotros.',
  leadSection: {
    heading: 'Política de privacidad',
    paragraphs: [
      'A través de este sitio web no se recaban datos de carácter personal de las personas usuarias sin su conocimiento, ni se ceden a terceros.',
      'Con la finalidad de ofrecerle el mejor servicio y con el objeto de facilitar el uso, se analizan el número de páginas visitadas, el número de visitas, así como la actividad de las persona visitantes y su frecuencia de utilización.',
      'GREGORIO MARCOS MINGUEZ no utiliza cookies para recoger información de las personas usuarias, ni registra las direcciones IP de acceso. Únicamente se utilizan cookies propias, de sesión, con finalidad técnica (aquellas que permiten la navegación a través del sitio web y la utilización de las diferentes opciones y servicios que en ella existen).',
      'El portal del que es titular GREGORIO MARCOS MINGUEZ contiene enlaces a sitios web de terceros, cuyas políticas de privacidad son ajenas a la de GREGORIO MARCOS MINGUEZ. Al acceder a tales sitios web usted puede decidir si acepta sus políticas de privacidad y de cookies.',
    ],
  },
  sections: [
    {
      heading: '1. Responsable del tratamiento',
      paragraphs: [
        'Responsable (Prestador del Servicio): GREGORIO MARCOS MINGUEZ',
        'Nombre Comercial: GREGORIO MARCOS MINGUEZ',
        'Domicilio Social: Pol. Ind. La Laguna P-6 Parcela 41- 47300 Peñafiel – Valladolid',
        'CIF / NIF: 12372778C',
        'Teléfono: 983 881 251',
        'Fax: 983 881 251',
        'e-Mail: info@bodegasmarcos.com',
        'Nombre de dominio: www.bodegasmarcos.es Inscrita en el Registro de Valladolid',
        'Los datos de carácter personal que se pudieran recabar directamente de la persona interesada serán tratados de forma confidencial y quedarán incorporados a la correspondiente actividad de tratamiento titularidad de la GREGORIO MARCOS MINGUEZ.',
        'La relación actualizada de las actividades de tratamiento que GREGORIO MARCOS MINGUEZ lleva a cabo se encuentra disponible en el registro de actividades de GREGORIO MARCOS MINGUEZ.',
      ],
    },
    {
      heading: '2. Finalidad',
      paragraphs: [
        'La finalidad del tratamiento de los datos corresponde a cada una de las actividades de tratamiento que realiza GREGORIO MARCOS MINGUEZ y que están accesibles en el registro de actividades de tratamiento.',
      ],
    },
    {
      heading: '3. Legitimación',
      paragraphs: [
        'El tratamiento de sus datos se realiza para el cumplimiento de obligaciones legales por parte de GREGORIO MARCOS MINGUEZ, para el cumplimiento de finalidades comerciales y empresariales de GREGORIO MARCOS MINGUEZ, así como cuando la finalidad del tratamiento requiera su consentimiento, que habrá de ser prestado mediante una clara acción afirmativa.',
        'Puede consultar la base legal para cada una de las actividades de tratamiento que lleva a cabo GREGORIO MARCOS MINGUEZ en el registro de actividades de GREGORIO MARCOS MINGUEZ.',
      ],
    },
    {
      heading: '4. Conservación de datos',
      paragraphs: [
        'Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recaban y para determinar las posibles responsabilidades que se pudieran derivar de la finalidad, además de los períodos establecidos en la normativa de archivos y documentación.',
      ],
    },
    {
      heading: '5. Comunicación de datos',
      paragraphs: [
        'Con carácter general no se comunicarán los datos personales a terceros, salvo obligación legal, entre las que pueden estar las comunicaciones al Defensor del Pueblo, Jueces y Tribunales, personas interesadas en los procedimientos relacionados con la reclamaciones presentadas.',
        'Puede consultar los destinatarios para cada una de las actividades de tratamiento que lleva a cabo GREGORIO MARCOS MINGUEZ en el registro de actividades de GREGORIO MARCOS MINGUEZ.',
      ],
    },
    {
      heading: '6. Derechos de las personas interesadas',
      paragraphs: [
        'Para solicitar el acceso, la rectificación, supresión o limitación del tratamiento de los datos personales o a oponerse al tratamiento, en el caso de se den los requisitos establecidos en el Reglamento General de Protección de Datos, así como en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personal y garantía de los derechos digitales, puede dirigir un escrito al responsable del tratamiento, en este caso, GREGORIO MARCOS MINGUEZ, dirigiendo el mismo a Pol. Ind. La Laguna P-6 Parcela 41- 47300 Peñafiel – Valladolid.',
      ],
    },
    {
      heading: '7. Propiedad intelectual e industrial',
      paragraphs: [
        'El diseño del portal y sus códigos fuente, así como los logos, marcas y demás signos distintivos que aparecen en el mismo pertenecen a GREGORIO MARCOS MINGUEZ y están protegidos por los correspondientes derechos de propiedad intelectual e industrial.',
      ],
    },
    {
      heading: '8. Responsabilidad de los contenidos',
      paragraphs: [
        'GREGORIO MARCOS MINGUEZ no se hace responsable de la legalidad de otros sitios web de terceros desde los que pueda accederse al portal. GREGORIO MARCOS MINGUEZ tampoco responde por la legalidad de otros sitios web de terceros, que pudieran estar vinculados o enlazados desde este portal.',
        'GREGORIO MARCOS MINGUEZ se reserva el derecho a realizar cambios en el sitio web sin previo aviso, al objeto de mantener actualizada su información, añadiendo, modificando, corrigiendo o eliminando los contenidos publicados o el diseño del portal.',
        'GREGORIO MARCOS MINGUEZ no será responsable del uso que terceros hagan de la información publicada en el portal, ni tampoco de los daños sufridos o pérdidas económicas que, de forma directa o indirecta, produzcan o puedan producir perjuicios económicos, materiales o sobre datos, provocados por el uso de dicha información.',
      ],
    },
    {
      heading: '9. Reproducción de contenidos',
      paragraphs: ['Se prohíbe la reproducción total o parcial de los contenidos publicados en el portal.'],
    },
    {
      heading: 'Ley aplicable',
      paragraphs: [
        'La ley aplicable en caso de disputa o conflicto de interpretación de los términos que conforman este aviso legal, así como cualquier cuestión relacionada con los servicios del presente portal, será la ley española.',
      ],
    },
  ],
};
