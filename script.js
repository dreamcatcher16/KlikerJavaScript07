// input polje za unos nove obaveze
inputEl = document.getElementById('input')
// lista obaveza
todosUL = document.getElementById('todos')

// na početku, učitavamo sve prethodno sačuvane obaveze
loadTodos()

function loadTodos() {
    // učitavamo sve naše obaveze iz lokalnog skladišta
    // localStorage.getItem(naziv_item-a) dohvata željeni item ukoliko postoji
    todos = JSON.parse(localStorage.getItem('todos'))

    // ukoliko obaveze ne postoje u skladištu (obrisali smo kolačiće ili prvi put koristimo stranicu)
    if (todos != undefined) {
        // svaku od obaveza iz skladišta ćemo prikazati na stranici
        todos.forEach(todo => addTodo(todo.text, todo.isCompleted))

        // dogovor je da za svaku obavezu čuvamo (uvek možemo proširiti)
        // text - sam tekst, odnosno opis, obaveze i
        // isCompleted - da li je obaveza završena
    }
}

// kada detekujemo taster
inputEl.addEventListener("keyup", function (event) {
    // tačnije Enter taster, dodaćemo novu obavezu na spisak obaveza
    if (event.code == 'Enter') {
        // alert('Kliknuo enter!')
        // podrazumevano, nova obaveza nije završena jer je tek kreirana (false)
        addTodo(inputEl.value, false)
    }
})

// funkcija za dodavanje nove obaveze ili obaveze pročitane iz lokalnog skladišta
function addTodo(todoText, isCompleted) {

    // nad stranicom kreiramo li element
    todoEl = document.createElement('li')
    // u okviru novog li elementa postavljamo opis obaveze
    todoEl.innerText = todoText

    if (isCompleted) {
        // ukoliko je obaveza završena dodelićemo li elementu 'completed' klasu
        todoEl.classList.add('completed')
    }

    // ukoliko se klikne levim klikom miša nad obavezom
    todoEl.addEventListener('click', (e) => {
        // e.target je element na koji je korisnik kliknuo
        clickedElement = e.target
        // toggle - ukoliko je elementu već pridružena klasa 'completed' uklonićemo je
        // u suprotnom ćemo je dodeliti
        clickedElement.classList.toggle('completed')

        // ažuriraćemo lokalno skladište (zbog izmenjenog statusa obaveze)
        updateLocalStorage()
    })

    // ukoliko se klikne desnim klikom miša nad obavezom
    todoEl.addEventListener('contextmenu', (e) => {
        // ukoliko bismo izostavili e.preventDefault()
        // standardni niz opcija koji se pojavljuje pri desnom kliku bi se iscrtao
        e.preventDefault()

        // e.target je element na koji je korisnik kliknuo
        clickedElement = e.target
        // obrisaćemo li element
        clickedElement.remove()

        // ažuriraćemo lokalno skladište (zbog obrisane obaveze)
        updateLocalStorage()
    })

    // kreirani li element sa obavezom dodajemo u okviru niza obaveza (li -> unordered list)
    todosUL.appendChild(todoEl)
    // uklanjamo opis obaveze iz input polja radi boljeg korisničkog iskustva
    inputEl.value = ''

    // ažuriraćemo lokalno skladište (zbog dodate obaveze)
    updateLocalStorage()
}

// funkcija za čuvanje, odnosno аžuriranje, obaveza u okviru lokalnog skladišta
function updateLocalStorage() {
    // dohvatamo sve li elemente
    todosEl = document.querySelectorAll('li')
    todos = []

    // za svaki li element
    todosEl.forEach(todoEl => {
        // napravićemo todo u okviru kojeg ćemo čuvati informacije o toj obavezi
        todo = {
            text: todoEl.innerText, // čuvamo opis obaveze
            isCompleted: todoEl.classList.contains('completed') // čuvamo status obaveze (da li je završena ili ne)
        }

        // todo informacije čuvamo u okviru niza drugih todo informacija, dodavanjem na kraj niza (push)
        todos.push(todo)
    })

    // jednom kada imamo sve todo informacije, sačuvaćemo ih u okviru lokalnog skladišta
    localStorage.setItem('todos', JSON.stringify(todos))
}

// NAPOMENA
// jednostavne i složene informacije u okviru lokalnog skladišta se čuvaju poput teksta

// npr. 
// {
//     text: 'Treba da uradim domaći',
//     isCompleted: false
// }
// se čuva kao "{text: 'Treba da uradim domaći', isCompleted: false}"
// kako JavaScript to ne radi sam za nas, moramo da koristimo JSON.stringify(složena_promenljiva)
// kako bismo složeniju JavaScript promenljivu "pretvorili" u tekst

// slično i važi u obrnutom smeru, ukoliko želimo da
// tekst "pretvorimo" nazad u složeniju JavaScript promenljivu
// tada bismo koristili JSON.parse(složeni_tekst)

// JSON.stringify(složena_promenljiva) -> vraća tekst od složene promenljive
// JSON.parse(složeni_tekst) -> vraća složenu promenljivu od teksta