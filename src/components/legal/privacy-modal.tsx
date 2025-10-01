"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacyModal({ open, onOpenChange }: PrivacyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold font-sans">
            Política de Privacidad y Protección de Datos
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(85vh-8rem)] pr-4">
          <div className="space-y-6 text-sm">
            {/* 1. Introducción */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                1. Introducción
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                En LexIA Technologies S.L. (en adelante, &quot;LexIA&quot; o
                &quot;nosotros&quot;), nos comprometemos a proteger su
                privacidad y sus datos personales. Esta Política de Privacidad
                describe cómo recopilamos, usamos, almacenamos y protegemos su
                información personal cuando utiliza nuestra plataforma LexIA.
              </p>
              <p className="text-muted-foreground font-serif">
                Esta política cumple con el Reglamento (UE) 2016/679 del
                Parlamento Europeo y del Consejo, de 27 de abril de 2016,
                relativo a la protección de las personas físicas en lo que
                respecta al tratamiento de datos personales (RGPD), y con la Ley
                Orgánica 3/2018, de 5 de diciembre, de Protección de Datos
                Personales y garantía de los derechos digitales (LOPDGDD).
              </p>
            </section>

            {/* 2. Responsable del Tratamiento */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                2. Responsable del Tratamiento de Datos
              </h2>
              <div className="ml-4 space-y-1 text-muted-foreground font-serif">
                <p>
                  <strong>Identidad:</strong> LexIA Technologies S.L.
                </p>
                <p>
                  <strong>Dirección postal:</strong> Calle Gran Vía, 45, 28013
                  Madrid, España
                </p>
                <p>
                  <strong>CIF:</strong> B-12345678
                </p>
                <p>
                  <strong>Email de contacto:</strong> privacidad@lexia.es
                </p>
                <p>
                  <strong>Delegado de Protección de Datos (DPO):</strong>{" "}
                  dpo@lexia.es
                </p>
                <p>
                  <strong>Teléfono:</strong> +34 910 123 456
                </p>
              </div>
            </section>

            {/* 3. Datos Recopilados */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                3. Datos Personales Recopilados
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Recopilamos las siguientes categorías de datos personales:
              </p>

              <div className="mb-3">
                <h3 className="mb-1 font-semibold text-foreground font-sans">
                  3.1. Datos de Registro y Autenticación
                </h3>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                  <li>Nombre y apellidos</li>
                  <li>Dirección de correo electrónico</li>
                  <li>Contraseña (almacenada de forma cifrada)</li>
                  <li>Fecha de creación de la cuenta</li>
                  <li>
                    Identificador único de usuario (generado automáticamente)
                  </li>
                </ul>
              </div>

              <div className="mb-3">
                <h3 className="mb-1 font-semibold text-foreground font-sans">
                  3.2. Datos de Uso del Servicio
                </h3>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                  <li>
                    Consultas realizadas al asistente legal (contenido de las
                    preguntas)
                  </li>
                  <li>Respuestas generadas por la inteligencia artificial</li>
                  <li>Historial de conversaciones</li>
                  <li>Categorías temáticas de las consultas</li>
                  <li>Fecha y hora de cada interacción</li>
                  <li>Número de tokens procesados por conversación</li>
                </ul>
              </div>

              <div className="mb-3">
                <h3 className="mb-1 font-semibold text-foreground font-sans">
                  3.3. Datos Técnicos y de Navegación
                </h3>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                  <li>
                    Dirección IP (anonimizada tras 48 horas para cumplir con
                    RGPD)
                  </li>
                  <li>Tipo y versión del navegador</li>
                  <li>Sistema operativo</li>
                  <li>Páginas visitadas dentro de la plataforma</li>
                  <li>Tiempo de permanencia en cada página</li>
                  <li>URL de referencia</li>
                  <li>Información de cookies (ver sección 10)</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-1 font-semibold text-foreground font-sans">
                  3.4. Datos de Terceros (Autenticación Social)
                </h3>
                <p className="text-muted-foreground font-serif">
                  Si decide registrarse mediante servicios de terceros (Google,
                  Microsoft, etc.), podemos recibir:
                </p>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                  <li>Nombre y apellidos de su perfil público</li>
                  <li>Dirección de correo electrónico verificada</li>
                  <li>Fotografía de perfil (opcional)</li>
                  <li>Identificador único del proveedor de autenticación</li>
                </ul>
              </div>
            </section>

            {/* 4. Finalidad del Tratamiento */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                4. Finalidad del Tratamiento de Datos
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Utilizamos sus datos personales para las siguientes finalidades:
              </p>

              <div className="space-y-2">
                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    4.1. Prestación del Servicio
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                    <li>Crear y gestionar su cuenta de usuario</li>
                    <li>
                      Procesar sus consultas y generar respuestas mediante IA
                    </li>
                    <li>Mantener el historial de conversaciones</li>
                    <li>Personalizar su experiencia de usuario</li>
                    <li>Proporcionar soporte técnico y atención al cliente</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    4.2. Mejora y Desarrollo del Servicio
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                    <li>Analizar patrones de uso para mejorar la plataforma</li>
                    <li>
                      Entrenar y optimizar los modelos de inteligencia
                      artificial
                    </li>
                    <li>Identificar y corregir errores técnicos</li>
                    <li>Desarrollar nuevas funcionalidades</li>
                    <li>Realizar estudios estadísticos (datos anonimizados)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    4.3. Comunicaciones
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                    <li>
                      Enviar notificaciones técnicas y actualizaciones del
                      servicio
                    </li>
                    <li>Responder a sus consultas y solicitudes de soporte</li>
                    <li>
                      Informar sobre cambios en los Términos o Política de
                      Privacidad
                    </li>
                    <li>
                      Enviar comunicaciones comerciales (solo con su
                      consentimiento previo)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    4.4. Seguridad y Cumplimiento Legal
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                    <li>Detectar y prevenir fraudes y abusos</li>
                    <li>
                      Garantizar la seguridad de la plataforma y los usuarios
                    </li>
                    <li>
                      Cumplir con obligaciones legales y requerimientos
                      judiciales
                    </li>
                    <li>Proteger nuestros derechos legales</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. Base Legal */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                5. Base Legal del Tratamiento
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                El tratamiento de sus datos personales se fundamenta en las
                siguientes bases legales conforme al RGPD:
              </p>

              <div className="space-y-2">
                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    5.1. Ejecución de un Contrato (Art. 6.1.b RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    El tratamiento de sus datos de registro, consultas y uso del
                    servicio es necesario para la ejecución del contrato
                    establecido mediante los Términos y Condiciones.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    5.2. Consentimiento (Art. 6.1.a RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Para comunicaciones comerciales, uso de cookies no
                    esenciales y procesamiento de datos para mejora de
                    algoritmos de IA, solicitamos su consentimiento explícito.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    5.3. Interés Legítimo (Art. 6.1.f RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Para prevenir fraudes, garantizar seguridad, realizar
                    análisis estadísticos y mejorar nuestros servicios, nos
                    basamos en nuestro interés legítimo, siempre respetando sus
                    derechos fundamentales.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    5.4. Cumplimiento de Obligaciones Legales (Art. 6.1.c RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Cuando sea necesario cumplir con requerimientos legales,
                    fiscales o de autoridades competentes.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Conservación de Datos */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                6. Período de Conservación de Datos
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Conservamos sus datos personales durante los siguientes
                períodos:
              </p>

              <div className="space-y-2">
                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Datos de Cuenta Activa
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Mientras su cuenta permanezca activa y hasta que solicite su
                    eliminación.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Historial de Conversaciones
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Se conservan durante 3 años desde la última actividad, salvo
                    que solicite su eliminación anticipada.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Datos de Facturación y Transacciones
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Se conservan durante 6 años conforme a las obligaciones
                    fiscales españolas (Ley General Tributaria).
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Datos Anonimizados
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Los datos completamente anonimizados (sin posibilidad de
                    reidentificación) pueden conservarse indefinidamente para
                    análisis estadísticos.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Tras Eliminación de Cuenta
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Sus datos personales se eliminan en un plazo de 30 días
                    desde la solicitud, excepto aquellos que debamos conservar
                    por obligación legal.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Compartición de Datos */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                7. Compartición de Datos con Terceros
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                No vendemos sus datos personales a terceros. Compartimos sus
                datos únicamente en las siguientes circunstancias:
              </p>

              <div className="space-y-2">
                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    7.1. Proveedores de Servicios
                  </h3>
                  <p className="mb-1 text-muted-foreground font-serif">
                    Compartimos datos con proveedores que nos ayudan a operar la
                    plataforma:
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                    <li>
                      <strong>OpenAI</strong>: Para procesar consultas mediante
                      modelos de IA (GPT-4). Consulte su política de privacidad
                      en openai.com/privacy
                    </li>
                    <li>
                      <strong>Clerk</strong>: Para gestión de autenticación y
                      usuarios. Consulte clerk.com/privacy
                    </li>
                    <li>
                      <strong>Proveedores de hosting</strong>: Para
                      almacenamiento y procesamiento de datos (servidores en la
                      UE)
                    </li>
                    <li>
                      <strong>Servicios de análisis</strong>: Para métricas de
                      uso (datos anonimizados)
                    </li>
                  </ul>
                  <p className="mt-1 text-muted-foreground font-serif">
                    Todos estos proveedores están obligados contractualmente a
                    proteger sus datos y solo pueden usarlos para los fines
                    especificados.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    7.2. Transferencias Internacionales
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Algunos de nuestros proveedores (como OpenAI) están ubicados
                    fuera del Espacio Económico Europeo (EEE). Para estas
                    transferencias, implementamos garantías adecuadas mediante:
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                    <li>Cláusulas Contractuales Tipo aprobadas por la UE</li>
                    <li>
                      Certificaciones de adecuación (ej: EU-US Data Privacy
                      Framework)
                    </li>
                    <li>
                      Medidas de seguridad adicionales (cifrado,
                      pseudonimización)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    7.3. Requerimientos Legales
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Podemos divulgar sus datos si es requerido por ley, orden
                    judicial, o para proteger nuestros derechos legales y
                    seguridad.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    7.4. Transacciones Corporativas
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    En caso de fusión, adquisición o venta de activos, sus datos
                    podrían transferirse al nuevo propietario, quien quedará
                    obligado por esta Política de Privacidad.
                  </p>
                </div>
              </div>
            </section>

            {/* 8. Derechos del Usuario */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                8. Derechos del Usuario (RGPD)
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Como titular de sus datos personales, usted tiene los siguientes
                derechos conforme al RGPD y LOPDGDD:
              </p>

              <div className="space-y-2">
                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    8.1. Derecho de Acceso (Art. 15 RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Puede solicitar información sobre qué datos personales
                    tenemos sobre usted y obtener una copia de los mismos.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    8.2. Derecho de Rectificación (Art. 16 RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Puede solicitar la corrección de datos inexactos o
                    incompletos.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    8.3. Derecho de Supresión - &quot;Derecho al Olvido&quot;
                    (Art. 17 RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Puede solicitar la eliminación de sus datos personales
                    cuando ya no sean necesarios, retire su consentimiento, o se
                    opongan al tratamiento.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    8.4. Derecho a la Limitación del Tratamiento (Art. 18 RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Puede solicitar que suspendamos temporalmente el tratamiento
                    de sus datos en determinadas circunstancias.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    8.5. Derecho a la Portabilidad (Art. 20 RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Puede recibir sus datos en formato estructurado y de uso
                    común (JSON, CSV) para transferirlos a otro responsable.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    8.6. Derecho de Oposición (Art. 21 RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Puede oponerse al tratamiento de sus datos por motivos
                    relacionados con su situación particular, especialmente para
                    marketing directo.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    8.7. Derecho a No Ser Objeto de Decisiones Automatizadas
                    (Art. 22 RGPD)
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Puede solicitar intervención humana en decisiones basadas
                    únicamente en tratamiento automatizado que produzcan efectos
                    jurídicos.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    8.8. Derecho a Retirar el Consentimiento
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Puede retirar su consentimiento en cualquier momento sin
                    afectar la licitud del tratamiento previo.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Cómo Ejercer Sus Derechos
                  </h3>
                  <p className="mb-1 text-muted-foreground font-serif">
                    Para ejercer cualquiera de estos derechos, puede:
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                    <li>
                      Enviar un correo a: <strong>privacidad@lexia.es</strong>
                    </li>
                    <li>
                      Escribir a: LexIA Technologies S.L., Calle Gran Vía, 45,
                      28013 Madrid, España
                    </li>
                    <li>Utilizar el formulario de contacto en la plataforma</li>
                  </ul>
                  <p className="mt-1 text-muted-foreground font-serif">
                    Responderemos a su solicitud en un plazo máximo de{" "}
                    <strong>30 días</strong>. Podemos solicitar documentación
                    adicional para verificar su identidad antes de procesar la
                    solicitud.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Derecho a Presentar Reclamación
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Si considera que el tratamiento de sus datos vulnera la
                    normativa, puede presentar reclamación ante la Agencia
                    Española de Protección de Datos (AEPD):
                  </p>
                  <div className="ml-4 mt-1 space-y-1 text-muted-foreground font-serif">
                    <p>
                      <strong>AEPD</strong>
                    </p>
                    <p>C/ Jorge Juan, 6, 28001 Madrid</p>
                    <p>www.aepd.es</p>
                    <p>Teléfono: 901 100 099 / 912 663 517</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 9. Seguridad */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                9. Medidas de Seguridad
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Implementamos medidas técnicas y organizativas apropiadas para
                proteger sus datos personales contra acceso no autorizado,
                pérdida, destrucción o alteración:
              </p>

              <div className="space-y-2">
                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Medidas Técnicas
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                    <li>
                      Cifrado SSL/TLS para todas las transmisiones de datos
                    </li>
                    <li>Cifrado AES-256 para datos sensibles en reposo</li>
                    <li>Hashing bcrypt para contraseñas (irreversible)</li>
                    <li>Autenticación multifactor (MFA) disponible</li>
                    <li>Firewalls y sistemas de detección de intrusiones</li>
                    <li>
                      Backups automáticos y cifrados con retención de 30 días
                    </li>
                    <li>Monitorización continua de seguridad 24/7</li>
                    <li>Actualización regular de sistemas y parches</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Medidas Organizativas
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                    <li>
                      Acceso restringido a datos personales solo a personal
                      autorizado
                    </li>
                    <li>
                      Acuerdos de confidencialidad con todos los empleados
                    </li>
                    <li>
                      Formación regular en protección de datos y ciberseguridad
                    </li>
                    <li>
                      Políticas internas de seguridad de la información (ISO
                      27001)
                    </li>
                    <li>
                      Evaluaciones de impacto de privacidad (EIPD) para
                      tratamientos de alto riesgo
                    </li>
                    <li>
                      Plan de respuesta ante brechas de seguridad (notificación
                      en 72h si procede)
                    </li>
                    <li>Auditorías de seguridad periódicas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Notificación de Brechas de Seguridad
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    En caso de brecha de seguridad que pueda suponer un riesgo
                    para sus derechos y libertades, le notificaremos en un plazo
                    de 72 horas e informaremos a la AEPD conforme al Art. 33
                    RGPD.
                  </p>
                </div>
              </div>
            </section>

            {/* 10. Cookies */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                10. Política de Cookies
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                LexIA utiliza cookies y tecnologías similares para mejorar su
                experiencia de usuario y analizar el uso de la plataforma.
              </p>

              <div className="space-y-2">
                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Cookies Estrictamente Necesarias
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Esenciales para el funcionamiento de la plataforma
                    (autenticación, sesión). No requieren consentimiento.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>
                      <strong>__session</strong>: Token de sesión de usuario
                      (duración: sesión)
                    </li>
                    <li>
                      <strong>clerk_session</strong>: Autenticación de Clerk
                      (duración: 7 días)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Cookies de Funcionalidad
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Para recordar sus preferencias (tema, idioma). Requieren
                    consentimiento.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>
                      <strong>theme</strong>: Preferencia de tema claro/oscuro
                      (duración: 1 año)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Cookies Analíticas
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Para entender cómo usa la plataforma (datos anonimizados).
                    Requieren consentimiento.
                  </p>
                  <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                    <li>
                      <strong>_ga</strong>: Google Analytics (duración: 2 años)
                    </li>
                    <li>
                      <strong>_ga_*</strong>: Google Analytics (duración: 2
                      años)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-1 font-semibold text-foreground font-sans">
                    Gestión de Cookies
                  </h3>
                  <p className="text-muted-foreground font-serif">
                    Puede gestionar sus preferencias de cookies en la
                    configuración de su navegador o mediante nuestro banner de
                    cookies. Rechazar cookies no esenciales puede afectar
                    algunas funcionalidades.
                  </p>
                </div>
              </div>
            </section>

            {/* 11. Cambios en la Política */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                11. Cambios en esta Política de Privacidad
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Podemos actualizar esta Política de Privacidad periódicamente
                para reflejar cambios en nuestras prácticas, tecnología,
                requisitos legales u otros factores.
              </p>
              <p className="mb-2 text-muted-foreground">
                Cuando realicemos cambios materiales, le notificaremos mediante:
              </p>
              <ul className="mb-2 list-inside list-disc space-y-1 text-muted-foreground">
                <li>
                  Correo electrónico a la dirección asociada a su cuenta (al
                  menos 30 días antes)
                </li>
                <li>Aviso destacado en la plataforma</li>
                <li>
                  Actualización de la fecha de &quot;Última actualización&quot;
                  al inicio de este documento
                </li>
              </ul>
              <p className="text-muted-foreground">
                Le recomendamos revisar esta política periódicamente. El uso
                continuado del Servicio tras la publicación de cambios
                constituye su aceptación de los mismos.
              </p>
            </section>

            {/* 12. Contacto */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                12. Información de Contacto
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Para cualquier consulta, solicitud o reclamación relacionada con
                la protección de sus datos personales, puede contactarnos:
              </p>
              <div className="ml-4 space-y-1 text-muted-foreground font-serif">
                <p>
                  <strong>Responsable de Protección de Datos:</strong>
                </p>
                <p>Email: dpo@lexia.es / privacidad@lexia.es</p>
                <p>Teléfono: +34 910 123 456</p>
                <p>
                  Dirección postal: LexIA Technologies S.L., Att. DPO, Calle
                  Gran Vía, 45, 28013 Madrid, España
                </p>
              </div>
              <p className="mt-2 text-muted-foreground font-serif">
                Nos comprometemos a responder a todas las consultas en un plazo
                máximo de 30 días naturales.
              </p>
            </section>

            {/* Última actualización */}
            <section className="border-t pt-4">
              <p className="text-xs text-muted-foreground font-serif">
                Última actualización: 1 de octubre de 2025
              </p>
              <p className="text-xs text-muted-foreground font-serif">
                Versión: 1.0
              </p>
              <p className="text-xs text-muted-foreground font-serif">
                Esta política cumple con: RGPD (UE) 2016/679 | LOPDGDD 3/2018 |
                LSSI-CE 34/2002
              </p>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            onClick={() => onOpenChange(false)}
            variant="default"
            className="w-full sm:w-auto"
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
