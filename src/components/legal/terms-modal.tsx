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

interface TermsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TermsModal({ open, onOpenChange }: TermsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold font-sans">
            Términos y Condiciones de Uso
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(85vh-8rem)] pr-4">
          <div className="space-y-6 text-sm">
            {/* 1. Introducción y Aceptación */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                1. Introducción y Aceptación
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Bienvenido a LexIA, un asistente inteligente especializado en
                legislación española. Estos Términos y Condiciones de Uso (en
                adelante, &quot;Términos&quot;) regulan el acceso y uso de la
                plataforma LexIA (en adelante, &quot;el Servicio&quot;)
                proporcionada por LexIA Technologies S.L. (en adelante,
                &quot;LexIA&quot;, &quot;nosotros&quot; o &quot;nuestra
                empresa&quot;).
              </p>
              <p className="text-muted-foreground font-serif">
                Al acceder o utilizar LexIA, usted (en adelante, &quot;el
                Usuario&quot;) acepta quedar vinculado por estos Términos en su
                totalidad. Si no está de acuerdo con estos Términos, le rogamos
                que no utilice el Servicio. El uso continuado del Servicio
                constituye su aceptación de estos Términos y de cualquier
                modificación posterior.
              </p>
            </section>

            {/* 2. Descripción del Servicio */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                2. Descripción del Servicio
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                LexIA es una plataforma de asistencia legal basada en
                inteligencia artificial que proporciona información general
                sobre legislación española. El Servicio está diseñado para:
              </p>
              <ul className="mb-2 list-inside list-disc space-y-1 text-muted-foreground font-serif">
                <li>
                  Proporcionar información general sobre leyes y normativas
                  españolas
                </li>
                <li>
                  Responder consultas relacionadas con diferentes áreas del
                  derecho español
                </li>
                <li>
                  Ofrecer orientación preliminar sobre cuestiones legales
                  comunes
                </li>
                <li>Facilitar la comprensión de conceptos jurídicos básicos</li>
              </ul>
              <p className="mb-2 font-semibold text-foreground font-sans">
                Limitaciones importantes:
              </p>
              <ul className="list-inside list-disc space-y-1 text-muted-foreground font-serif">
                <li>
                  LexIA NO proporciona asesoramiento legal personalizado ni
                  sustituye la consulta con un abogado profesional
                </li>
                <li>
                  La información proporcionada es de carácter general y no debe
                  considerarse como consejo legal específico para su situación
                </li>
                <li>
                  LexIA no establece ninguna relación abogado-cliente con los
                  usuarios
                </li>
                <li>
                  Las respuestas generadas por IA pueden contener imprecisiones
                  y deben verificarse con fuentes oficiales
                </li>
              </ul>
            </section>

            {/* 3. Uso Aceptable */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                3. Uso Aceptable
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                El Usuario se compromete a utilizar el Servicio de manera
                responsable y conforme a la legislación vigente. Queda
                expresamente prohibido:
              </p>
              <ul className="mb-2 list-inside list-disc space-y-1 text-muted-foreground font-serif">
                <li>
                  Utilizar el Servicio para fines ilegales, fraudulentos o no
                  autorizados
                </li>
                <li>
                  Introducir contenido ofensivo, difamatorio, discriminatorio o
                  que incite al odio
                </li>
                <li>
                  Intentar vulnerar, comprometer o desactivar las medidas de
                  seguridad del Servicio
                </li>
                <li>
                  Realizar ingeniería inversa, descompilar o desensamblar el
                  software de la plataforma
                </li>
                <li>
                  Utilizar robots, scrapers o cualquier método automatizado para
                  acceder al Servicio sin autorización
                </li>
                <li>Suplantar la identidad de otra persona o entidad</li>
                <li>
                  Interferir con el funcionamiento normal del Servicio o con el
                  uso del mismo por parte de otros usuarios
                </li>
                <li>
                  Recopilar información personal de otros usuarios sin su
                  consentimiento
                </li>
                <li>
                  Utilizar el Servicio para distribuir spam, malware o contenido
                  malicioso
                </li>
              </ul>
              <p className="text-muted-foreground font-serif">
                LexIA se reserva el derecho de suspender o cancelar el acceso al
                Servicio de cualquier Usuario que incumpla estos Términos, sin
                previo aviso y sin responsabilidad alguna.
              </p>
            </section>

            {/* 4. Propiedad Intelectual */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                4. Propiedad Intelectual
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Todos los derechos de propiedad intelectual relacionados con
                LexIA, incluyendo pero no limitándose a:
              </p>
              <ul className="mb-2 list-inside list-disc space-y-1 text-muted-foreground font-serif">
                <li>El diseño, código fuente y estructura de la plataforma</li>
                <li>Las marcas comerciales, logotipos y nombres comerciales</li>
                <li>Los contenidos generados por el sistema</li>
                <li>La documentación y materiales relacionados</li>
              </ul>
              <p className="mb-2 text-muted-foreground font-serif">
                son propiedad exclusiva de LexIA Technologies S.L. o de sus
                licenciantes. Ningún elemento de estos Términos otorga al
                Usuario licencia o derecho alguno sobre la propiedad intelectual
                de LexIA, salvo el derecho limitado de uso del Servicio conforme
                a estos Términos.
              </p>
              <p className="mb-2 text-muted-foreground font-serif">
                El Usuario conserva todos los derechos sobre el contenido que
                introduce en el Servicio (consultas, preguntas, etc.). Sin
                embargo, al utilizar el Servicio, el Usuario otorga a LexIA una
                licencia mundial, no exclusiva, libre de regalías y transferible
                para usar, reproducir, modificar y analizar dicho contenido con
                el fin de proporcionar y mejorar el Servicio.
              </p>
            </section>

            {/* 5. Limitación de Responsabilidad */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                5. Limitación de Responsabilidad
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                El Servicio se proporciona &quot;TAL CUAL&quot; y &quot;SEGÚN
                DISPONIBILIDAD&quot;, sin garantías de ningún tipo, ya sean
                expresas o implícitas. LexIA no garantiza que:
              </p>
              <ul className="mb-2 list-inside list-disc space-y-1 text-muted-foreground font-serif">
                <li>
                  El Servicio esté libre de errores o funcione sin
                  interrupciones
                </li>
                <li>
                  La información proporcionada sea completa, precisa o
                  actualizada
                </li>
                <li>
                  Los resultados obtenidos mediante el uso del Servicio sean
                  exactos o fiables
                </li>
                <li>El Servicio cumpla con sus expectativas específicas</li>
              </ul>
              <p className="mb-2 font-semibold text-foreground font-sans">
                Exención de responsabilidad legal:
              </p>
              <p className="mb-2 text-muted-foreground font-serif">
                LexIA NO SE HACE RESPONSABLE de ningún daño, pérdida o perjuicio
                derivado de:
              </p>
              <ul className="mb-2 list-inside list-disc space-y-1 text-muted-foreground font-serif">
                <li>
                  Decisiones tomadas en base a la información proporcionada por
                  el Servicio
                </li>
                <li>
                  Errores, imprecisiones u omisiones en el contenido generado
                </li>
                <li>
                  Interrupciones, fallos técnicos o indisponibilidad del
                  Servicio
                </li>
                <li>Acceso no autorizado a sus datos o comunicaciones</li>
                <li>Conducta de terceros en relación con el Servicio</li>
              </ul>
              <p className="text-muted-foreground font-serif">
                En ningún caso LexIA será responsable por daños indirectos,
                incidentales, especiales, consecuentes o punitivos, incluyendo
                pérdida de beneficios, datos o uso, derivados del uso o
                imposibilidad de uso del Servicio.
              </p>
            </section>

            {/* 6. Privacidad y Datos */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                6. Privacidad y Datos Personales
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                El tratamiento de sus datos personales se rige por nuestra
                Política de Privacidad, que cumple con el Reglamento General de
                Protección de Datos (RGPD - UE 2016/679) y la Ley Orgánica
                3/2018, de 5 de diciembre, de Protección de Datos Personales y
                garantía de los derechos digitales (LOPDGDD).
              </p>
              <p className="mb-2 text-muted-foreground font-serif">
                Al utilizar el Servicio, usted acepta la recopilación, uso y
                procesamiento de sus datos personales según lo descrito en
                nuestra Política de Privacidad. Le recomendamos leer
                detenidamente dicho documento.
              </p>
              <p className="text-muted-foreground font-serif">
                LexIA implementa medidas de seguridad técnicas y organizativas
                apropiadas para proteger sus datos personales contra acceso no
                autorizado, pérdida o destrucción accidental.
              </p>
            </section>

            {/* 7. Modificaciones */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                7. Modificaciones del Servicio y los Términos
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                LexIA se reserva el derecho de modificar, suspender o
                discontinuar, temporal o permanentemente, el Servicio (o
                cualquier parte del mismo) en cualquier momento y sin previo
                aviso. LexIA no será responsable ante el Usuario ni ante
                terceros por cualquier modificación, suspensión o
                discontinuación del Servicio.
              </p>
              <p className="mb-2 text-muted-foreground font-serif">
                Estos Términos pueden ser modificados en cualquier momento.
                Cuando realicemos cambios materiales, notificaremos a los
                usuarios mediante:
              </p>
              <ul className="mb-2 list-inside list-disc space-y-1 text-muted-foreground font-serif">
                <li>Publicación de los nuevos Términos en la plataforma</li>
                <li>
                  Notificación por correo electrónico (si dispone de cuenta
                  registrada)
                </li>
                <li>
                  Aviso destacado en la interfaz del Servicio durante un período
                  razonable
                </li>
              </ul>
              <p className="text-muted-foreground font-serif">
                El uso continuado del Servicio después de la publicación de los
                Términos modificados constituye su aceptación de dichos cambios.
                Si no está de acuerdo con los nuevos Términos, debe dejar de
                utilizar el Servicio.
              </p>
            </section>

            {/* 8. Legislación Aplicable */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                8. Legislación Aplicable y Jurisdicción
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Estos Términos se rigen e interpretan de acuerdo con la
                legislación española. Para cualquier controversia derivada de la
                interpretación o ejecución de estos Términos, las partes se
                someten, con renuncia expresa a cualquier otro fuero, a los
                juzgados y tribunales de Madrid (España).
              </p>
              <p className="text-muted-foreground font-serif">
                Sin perjuicio de lo anterior, si el Usuario actúa como
                consumidor según lo definido en el Real Decreto Legislativo
                1/2007, de 16 de noviembre, por el que se aprueba el texto
                refundido de la Ley General para la Defensa de los Consumidores
                y Usuarios, será de aplicación el fuero que corresponda según
                dicha normativa.
              </p>
            </section>

            {/* 9. Contacto */}
            <section>
              <h2 className="mb-2 text-lg font-semibold font-sans">
                9. Contacto
              </h2>
              <p className="mb-2 text-muted-foreground font-serif">
                Para cualquier consulta, reclamación o sugerencia relacionada
                con estos Términos o el Servicio, puede ponerse en contacto con
                nosotros a través de:
              </p>
              <div className="ml-4 space-y-1 text-muted-foreground font-serif">
                <p>
                  <strong>LexIA Technologies S.L.</strong>
                </p>
                <p>Dirección: Calle Gran Vía, 45, 28013 Madrid, España</p>
                <p>Email: legal@lexia.es</p>
                <p>Teléfono: +34 910 123 456</p>
                <p>CIF: B-12345678</p>
              </div>
            </section>

            {/* Última actualización */}
            <section className="border-t pt-4">
              <p className="text-xs text-muted-foreground font-serif">
                Última actualización: 1 de octubre de 2025
              </p>
              <p className="text-xs text-muted-foreground font-serif">
                Versión: 1.0
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
