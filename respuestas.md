# InFat
1.1 ¿Cuál es la diferencia entre interface y class en TypeScript? Da un ejemplo concreto de cuándo usarías cada uno.

Una interfaz define cómo debe ser la forma de un objeto.
```ts
interface Person{
    name: string;
    age: number;
}
// implementación 
const user: Person = {
    name: "Alejandro",
    age: 21
}
```

Una clase define la estructura mas el comportamiento puede llevar propiedades, constructores y métodos.
```ts
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

    toGreep(){
        console.log(`Hola soy ${this.name} y tengo ${this.age}`)
    }
}

const user = new Person("Alejandro", 21);
user.toGreep();
```

1.2 En Angular, ¿qué diferencia hay entre un Observable y una Promise? ¿Por qué HttpClient devuelve Observable en lugar de Promise?

Las diferencias son: 

1. Observable devuleve multiples valores en el tiempo mientras que promise solo regresa uno. 
2. promise se ejecuta al crearse mientras que oberservable funciona bajo suscripción solo se ejecuta cuando alguien se suscribe.
3. promise no se puede cancelar mientras que observable si se puede con **unsubscribe()**.
4. promise no tiene operadores avanzados para flujos de datos mientras que observable cuenta con muchos ej **map, filter, retry, etc.**.

agular retorna Observable en lugar de promise para mantener un dominio sobre lo que ocurre en las vistas y peticiones ya que por ejempo con observable podemos hacer reintentos o cancelación ,ientras que con promise eso no se logra, o si por ejemplo un usuario cambia de vista Angular puede hacer cancelación de la petición.

¿Qué ocurre si nadie llama a .subscribe() sobre el resultado de getAll()? Explica por qué.

No ocurre **Nada** porque si no hay una suscripción entonces esa petición no es lansada en el fragmento solo esta definida pero no se envía aún. 

1.4 ¿Cuál es el propósito de un middleware en Express? Muestra un ejemplo mínimo (pseudocódigo está bien) de cómo encadenarías un middleware de autenticación antes del handler de un endpoint.

su propósito es: interceptar, modificar, validar o decidir si una petición puede continuar hacia el handler final.
```ts
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  // Validar token
  req.user = { id: 1, role: 'admin' };

  next(); // permite continuar al handler
}

app.get('/api/customers', authMiddleware, (req, res) => {
  res.json({ message: 'Clientes protegidos', user: req.user });
});
```

1.5 Con la definición de CustomerStatus del contexto de dominio, ¿qué error mostraría TypeScript al compilar la siguiente línea, y por qué?

const s: CustomerStatus = "ACTIVE";

en primera instancia mostraria "Type '"ACTIVE"' is not assignable to type 'CustomerStatus'." ocurre porque CustomerStatus es un enum y "ACTIVE" es un string el no acepta strings arbitrarios solo sus definidos
