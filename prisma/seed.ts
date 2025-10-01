import prisma from "@/lib/prisma";

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  console.log("🧹 Limpiando datos existentes...");
  await prisma.queryLog.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios de prueba
  console.log("👥 Creando usuarios de prueba...");

  const user1 = await prisma.user.create({
    data: {
      id: "user_demo_123456789",
      email: "ana.garcia@ejemplo.es",
      firstName: "Ana",
      lastName: "García",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: "user_demo_987654321",
      email: "carlos.lopez@ejemplo.es",
      firstName: "Carlos",
      lastName: "López",
      imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
  });

  console.log(`✅ Usuarios creados: ${user1.firstName}, ${user2.firstName}`);

  console.log("💬 Creando conversaciones de ejemplo...");

  const conv1 = await prisma.conversation.create({
    data: {
      userId: user1.id,
      title: "Consulta sobre despido improcedente",
      category: "laboral",
      createdAt: new Date("2024-09-15T10:30:00"),
      updatedAt: new Date("2024-09-15T10:35:00"),
      messages: {
        create: [
          {
            role: "user",
            content:
              "Me han despedido sin causa justificada. ¿Qué derechos tengo?",
            createdAt: new Date("2024-09-15T10:30:00"),
          },
          {
            role: "assistant",
            content: `Según el Estatuto de los Trabajadores (Real Decreto Legislativo 2/2015), si te han despedido sin causa justificada, se trata de un despido improcedente.

**Tus derechos incluyen:**

1. **Indemnización:** 33 días de salario por año trabajado, con un máximo de 24 mensualidades.

2. **Salarios de tramitación:** Desde la fecha del despido hasta la notificación de la sentencia o el reconocimiento de improcedencia.

3. **Opciones del empresario:**
   - Readmitirte en tu puesto
   - Pagarte la indemnización

**Plazo:** Dispones de 20 días hábiles desde el despido para presentar demanda ante el Juzgado de lo Social.

**Recomendación:** Solicita asesoramiento legal inmediato para proteger tus derechos. Si estás afiliado a un sindicato, ellos pueden representarte.

¿Necesitas información sobre cómo calcular tu indemnización o sobre el procedimiento judicial?`,
            createdAt: new Date("2024-09-15T10:32:00"),
            model: "gpt-4-turbo-preview",
            tokens: 245,
          },
          {
            role: "user",
            content:
              "Sí, ¿cómo calculo exactamente mi indemnización? Llevo 5 años y 3 meses trabajando.",
            createdAt: new Date("2024-09-15T10:33:00"),
          },
          {
            role: "assistant",
            content: `Para calcular tu indemnización por despido improcedente con 5 años y 3 meses de antigüedad:

**Fórmula:** 33 días de salario × años trabajados

**Cálculo paso a paso:**
1. Convierte los meses a fracción de año: 3 meses = 0.25 años
2. Total antigüedad: 5.25 años
3. Días de indemnización: 33 × 5.25 = 173.25 días
4. Multiplica por tu salario diario

**Ejemplo práctico:**
Si tu salario bruto mensual es 1.800€:
- Salario diario: 1.800€ ÷ 30 = 60€/día
- Indemnización: 173.25 días × 60€ = 10.395€

**Importante:** El salario diario se calcula dividiendo el salario mensual entre 30 días, e incluye:
- Salario base
- Complementos salariales
- Pagas extraordinarias prorrateadas

**Nota:** Este cálculo es orientativo. Te recomiendo que un abogado laboralista revise tu nómina para un cálculo exacto.`,
            createdAt: new Date("2024-09-15T10:35:00"),
            model: "gpt-4-turbo-preview",
            tokens: 312,
          },
        ],
      },
    },
  });

  const conv2 = await prisma.conversation.create({
    data: {
      userId: user1.id,
      title: "Dudas sobre contrato de alquiler",
      category: "civil",
      createdAt: new Date("2024-09-20T15:20:00"),
      updatedAt: new Date("2024-09-20T15:25:00"),
      messages: {
        create: [
          {
            role: "user",
            content: "¿Puede el casero subir el alquiler cuando quiera?",
            createdAt: new Date("2024-09-20T15:20:00"),
          },
          {
            role: "assistant",
            content: `No, el casero no puede subir el alquiler libremente. La Ley de Arrendamientos Urbanos (LAU - Ley 29/1994) establece normas claras:

**Actualización anual:**
- El alquiler solo puede actualizarse **una vez al año**
- Debe estar pactado en el contrato
- La referencia más común es el IPC (Índice de Precios al Consumo)
- La actualización se aplica en la fecha de aniversario del contrato

**Límites en la actualización:**
- Desde 2023, existe un tope del **2% anual** para contratos firmados antes de febrero 2023
- Para contratos nuevos, se aplica el IPC con posibles limitaciones según la legislación vigente

**Prohibiciones:**
- No puede subir el precio arbitrariamente
- No puede hacerlo más de una vez al año
- Debe respetar lo pactado en el contrato

**Tu protección:**
Si el casero intenta subir el alquiler fuera de estos términos, no estás obligado a aceptarlo. Cualquier modificación debe ser acordada por ambas partes o ajustarse a la ley.

¿Tienes alguna cláusula específica en tu contrato sobre actualizaciones de renta?`,
            createdAt: new Date("2024-09-20T15:25:00"),
            model: "gpt-4-turbo-preview",
            tokens: 289,
          },
        ],
      },
    },
  });

  const conv3 = await prisma.conversation.create({
    data: {
      userId: user2.id,
      title: "Información sobre herencia sin testamento",
      category: "civil",
      createdAt: new Date("2024-09-22T09:15:00"),
      updatedAt: new Date("2024-09-22T09:20:00"),
      messages: {
        create: [
          {
            role: "user",
            content:
              "Mi padre falleció sin hacer testamento. ¿Qué ocurre con la herencia?",
            createdAt: new Date("2024-09-22T09:15:00"),
          },
          {
            role: "assistant",
            content: `Lamento tu pérdida. Cuando una persona fallece sin testamento, se aplica la **sucesión intestada** o "ab intestato", regulada en el Código Civil (artículos 912-958).

**Orden de herederos según la ley:**

**1. Descendientes (hijos, nietos)**
- Tienen preferencia absoluta
- Heredan por partes iguales
- Si algún hijo ha fallecido, heredan sus descendientes

**2. Ascendientes (padres, abuelos)**
- Heredan solo si no hay descendientes
- Los padres tienen preferencia sobre los abuelos

**3. Cónyuge**
- Si hay hijos: derecho de usufructo de 1/3 de la herencia
- Si hay ascendientes: usufructo de 1/2
- Si no hay descendientes ni ascendientes: hereda todo

**4. Hermanos y sobrinos**
- Solo heredan si no hay descendientes, ascendientes ni cónyuge

**5. Parientes colaterales hasta 4º grado**
- Tíos, primos hermanos

**6. El Estado**
- Solo si no hay ningún familiar

**Procedimiento necesario:**
1. Declaración de herederos ante notario
2. Inventario de bienes
3. Liquidación de impuestos (Impuesto de Sucesiones)
4. Partición de la herencia

**Importante:** Aunque no haya testamento, es recomendable contar con un abogado para gestionar todo el proceso legal.

¿Necesitas información sobre algún paso específico del procedimiento?`,
            createdAt: new Date("2024-09-22T09:20:00"),
            model: "gpt-4-turbo-preview",
            tokens: 398,
          },
        ],
      },
    },
  });

  const conv4 = await prisma.conversation.create({
    data: {
      userId: user2.id,
      title: "Crear una SL o trabajar como autónomo",
      category: "mercantil",
      createdAt: new Date("2024-09-25T11:00:00"),
      updatedAt: new Date("2024-09-25T11:10:00"),
      messages: {
        create: [
          {
            role: "user",
            content:
              "Quiero emprender. ¿Es mejor crear una Sociedad Limitada o darme de alta como autónomo?",
            createdAt: new Date("2024-09-25T11:00:00"),
          },
          {
            role: "assistant",
            content: `Excelente pregunta. La decisión depende de varios factores. Te explico las diferencias:

**AUTÓNOMO (Empresario Individual)**

✅ **Ventajas:**
- Trámites simples y rápidos
- Costes iniciales bajos
- Gestión más sencilla
- Contabilidad simplificada

❌ **Desventajas:**
- Responsabilidad ilimitada (respondes con tu patrimonio personal)
- Cuota de autónomos obligatoria (desde 230€/mes aprox.)
- Imagen menos profesional ante grandes clientes

**SOCIEDAD LIMITADA (SL)**

✅ **Ventajas:**
- Responsabilidad limitada al capital aportado
- Mayor credibilidad profesional
- Mejor planificación fiscal a partir de ciertos ingresos
- Facilita incorporar socios

❌ **Desventajas:**
- Capital mínimo: 3.000€
- Constitución más compleja y costosa (notario, registro)
- Obligaciones contables más estrictas
- Costes de gestoría más altos

**¿CUÁNDO ELEGIR CADA OPCIÓN?**

**Elige AUTÓNOMO si:**
- Estás empezando y quieres probar tu idea
- Facturación prevista < 40.000€/año
- Actividad de bajo riesgo
- Trabajas solo

**Elige SL si:**
- Facturación prevista > 50.000€/año
- Actividad con riesgo patrimonial importante
- Piensas tener empleados o socios
- Necesitas imagen corporativa

**Alternativa intermedia:** Empezar como autónomo y crear una SL cuando el negocio crezca.

¿Qué tipo de actividad vas a desarrollar? Eso me ayudaría a darte una recomendación más específica.`,
            createdAt: new Date("2024-09-25T11:05:00"),
            model: "gpt-4-turbo-preview",
            tokens: 445,
          },
          {
            role: "user",
            content:
              "Desarrollo software para empresas. Espero facturar unos 60.000€ el primer año.",
            createdAt: new Date("2024-09-25T11:07:00"),
          },
          {
            role: "assistant",
            content: `Con ese perfil (desarrollo software y facturación esperada de 60.000€), te recomendaría **crear una SL** por las siguientes razones:

**1. Protección patrimonial**
- En desarrollo software puedes tener responsabilidades por fallos o incumplimientos
- Con una SL, tu patrimonio personal está protegido

**2. Ventaja fiscal**
Con 60.000€ de beneficio:
- **Autónomo:** IRPF progresivo (hasta 45% en tramos altos)
- **SL:** Impuesto de Sociedades al 25% (15% los dos primeros años para nuevas empresas)
- Puedes optimizar sacando un salario moderado y dejando beneficios en la empresa

**3. Imagen profesional**
- Empresas grandes prefieren contratar con sociedades
- Mayor credibilidad en licitaciones

**4. Flexibilidad futura**
- Facilita incorporar socios técnicos
- Más fácil vender la empresa si crece

**PLAN DE ACCIÓN RECOMENDADO:**

**Opción A - Directa a SL:**
1. Constitución de SL (coste: ~300-500€)
2. Capital social: 3.000€
3. Alta de administrador en Seguridad Social
4. Gestoría: ~150-250€/mes

**Opción B - Híbrida:**
1. Empieza como autónomo (rápido, sin inversión inicial)
2. Cuando consigas primeros clientes, crea la SL
3. Tiempo estimado: 3-6 meses

Mi consejo: Si ya tienes clientes o contratos cerrados, ve directo a SL. Si estás prospectando, empieza como autónomo.

¿Tienes ya clientes o contratos en cartera?`,
            createdAt: new Date("2024-09-25T11:10:00"),
            model: "gpt-4-turbo-preview",
            tokens: 412,
          },
        ],
      },
    },
  });

  console.log(
    `✅ Conversaciones creadas: ${conv1.title}, ${conv2.title}, ${conv3.title}, ${conv4.title}`
  );

  console.log("📊 Creando logs de consultas para analytics...");

  const queryLogs = await prisma.queryLog.createMany({
    data: [
      {
        userId: user1.id,
        query: "despido improcedente",
        category: "laboral",
        createdAt: new Date("2024-09-15T10:30:00"),
      },
      {
        userId: user1.id,
        query: "calcular indemnización despido",
        category: "laboral",
        createdAt: new Date("2024-09-15T10:33:00"),
      },
      {
        userId: user1.id,
        query: "subida alquiler",
        category: "civil",
        createdAt: new Date("2024-09-20T15:20:00"),
      },
      {
        userId: user2.id,
        query: "herencia sin testamento",
        category: "civil",
        createdAt: new Date("2024-09-22T09:15:00"),
      },
      {
        userId: user2.id,
        query: "sociedad limitada vs autónomo",
        category: "mercantil",
        createdAt: new Date("2024-09-25T11:00:00"),
      },
      {
        userId: user2.id,
        query: "crear empresa software",
        category: "mercantil",
        createdAt: new Date("2024-09-25T11:07:00"),
      },
      {
        userId: user1.id,
        query: "vacaciones no disfrutadas",
        category: "laboral",
        createdAt: new Date("2024-09-18T14:30:00"),
      },
      {
        userId: user2.id,
        query: "divorcio express",
        category: "civil",
        createdAt: new Date("2024-09-19T16:45:00"),
      },
    ],
  });

  console.log(`✅ ${queryLogs.count} logs de consultas creados`);

  const totalUsers = await prisma.user.count();
  const totalConversations = await prisma.conversation.count();
  const totalMessages = await prisma.message.count();
  const totalQueryLogs = await prisma.queryLog.count();

  console.log("\n📈 RESUMEN DE DATOS CREADOS:");
  console.log(`   👥 Usuarios: ${totalUsers}`);
  console.log(`   💬 Conversaciones: ${totalConversations}`);
  console.log(`   📝 Mensajes: ${totalMessages}`);
  console.log(`   📊 Logs de consultas: ${totalQueryLogs}`);
  console.log("\n✨ Seed completado exitosamente!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error en el seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
