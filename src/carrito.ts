import { Curso } from './types';

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');

let articulosCarrito: Curso[] = [];

export default (() => {
    listaCursos!.addEventListener('click', agregarCurso);
    carrito?.addEventListener('click', eliminarCurso);
    vaciarCarritoBtn?.addEventListener('click', vaciarCarrito);
})();

function agregarCurso(e: Event): void {
    e.preventDefault();

    const target = e.target as Element;

    if (target.classList.contains('agregar-carrito')) {
        const curso = target.parentElement?.parentElement;

        leerDatosCurso(curso);
    }
}

function eliminarCurso(e: Event) {
    const target = e.target as Element;

    const cursoId = target.getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML();
}

function vaciarCarrito() {
    articulosCarrito = [];
    (contenedorCarrito as Element).replaceChildren();
}

function leerDatosCurso(curso: HTMLElement | null | undefined): void {
    const infoCurso: Curso = {
        imagen: curso?.querySelector('img')?.src,
        titulo: curso?.querySelector('h4')?.textContent,
        precio: curso?.querySelector('.precio span')?.textContent,
        id: curso?.querySelector('a')?.dataset.id,
        cantidad: 1,
    };

    const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

    if (existe) {
        articulosCarrito = articulosCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
            }

            return curso;
        });
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

function carritoHTML(): void {
    (contenedorCarrito as Element).replaceChildren();

    articulosCarrito.forEach((curso) => {
        const { titulo, imagen, id, precio, cantidad } = curso;

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" alt="${titulo}" />
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        contenedorCarrito?.appendChild(row);
    });
}
