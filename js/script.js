'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          moviesList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(event)

        let newFilm = addInput.value;
        const favorite = checkbox.checked;
    
        if (newFilm) {
            if (newFilm.length >= 21) {
                newFilm = `${newFilm.substring(0, 22)}...`
            }
            if (favorite) {
                console.log("Добавляем любимый фильм");
            }

            movieDB.movies.push(newFilm);
            arrSort(movieDB.movies);
            createMovieList(movieDB.movies, moviesList);
        }
        event.target.reset();


    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove()
        })
    };
    // Удаление блока рекламы 

    const makeChanges = () => {
        genre.textContent = 'драма'
        poster.style.backgroundImage = 'url("img/bg.jpg")'
    };
    // Какие-то изменения 
    
    const arrSort = (arr) => {
        arr.sort();
    };
    // Сортировка списка фильмов

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        arrSort(films);
        films.forEach((item, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${item}
                <div class="delete"></div>
            </li>
             `
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createMovieList(films, parent);
            });
        });
    }
    // Создание списка фильмов

    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, moviesList);
});
