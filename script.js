class Book {
    constructor(text, author, price) {
        this.text = text;
        this.bookAuthor = author;
        this.bookPrice = price;
        this.pageStart = 0;
        this.pageEnd = 200;
        this.currentPage = 0;
        this.p = document.querySelector('p');
        this.btnStart = document.querySelectorAll('button')[0];
        this.btnNext = document.querySelectorAll('button')[1];
        this.btnPrev = document.querySelectorAll('button')[2];
        this.btnJump = document.querySelectorAll('button')[3];
        this.btnContinue = document.querySelectorAll('button')[4];
        this.jumpInput = document.querySelectorAll('input')[0];
        this.findInput = document.querySelectorAll('input')[1];  
        this.pages = Math.ceil(this.text.length / this.pageEnd);
        this.h2 = document.querySelector('h2');
        this.h3 = document.querySelector('h3');
        // this.loadText();
    }
    
    // pages starts from 0

    // loadText() {
    //     fetch(this.text)
    //     .then(response => response.json())
    //     .then(data => this.p.innerHTML =  data.title);
    // }

    methods() {
        this.btnStart.addEventListener('click', evt => this.startReading(evt));
        this.btnNext.addEventListener('click', evt => this.nextPage(evt));
        this.btnPrev.addEventListener('click', evt => this.prevPage(evt));
        this.btnPrev.setAttribute('disabled', false);
        this.btnJump.addEventListener('click', evt => this.jumpTo(evt));
        this.btnContinue.addEventListener('click', evt => this.continue(evt));
        this.findInput.setAttribute('disabled', true);
        this.btnNext.setAttribute('disabled', true);

    }

    startReading() { // fine
        this.findInput.removeAttribute('disabled');
        this.btnNext.removeAttribute('disabled');
        localStorage.setItem('page', `${this.currentPage}`);
        this.checkPages(this.currentPage);
        this.pageStart = 0;
        this.pageEnd = 200;
        this.currentPage = 0;
        return this.p.innerHTML =  this.text.substring(this.pageStart, this.pageEnd) + `<br><br> <h3>${this.currentPage}<h3>`;
    }

    checkPages(page) {
        if (page < 1) {
            this.btnPrev.setAttribute('disabled', true);
        } else if (page === this.pages){
            this.btnNext.setAttribute('disabled', true);
        } else {
            this.btnPrev.removeAttribute('disabled');
            this.btnNext.removeAttribute('disabled');
        }
    }


    nextPage() { // fine
        if(this.findInput.value.length > 0) {
            this.find(this.findInput.value);
        }

        this.pageStart = this.pageStart + 200;
        this.pageEnd = this.pageEnd + 200;
        this.currentPage = this.currentPage + 1;
        localStorage.setItem('page', `${this.currentPage}`);
       
        this.checkPages(this.currentPage);

        return this.p.innerHTML = this.text.substring(this.pageStart, this.pageEnd) + `<br><br> <h3>${this.currentPage}<h3>`;
    }

    prevPage() {  // fine
        this.checkPages(this.currentPage)
        this.pageStart = this.pageStart - 200;
        this.pageEnd = this.pageEnd - 200;
        this.currentPage = this.currentPage - 1;
        localStorage.setItem('page', `${this.currentPage}`);
        if (this.currentPage < 1) {
            this.btnPrev.setAttribute('disabled', true);
        } else {
            this.btnPrev.removeAttribute('disabled');
        }

        return this.p.innerHTML = this.text.substring(this.pageStart, this.pageEnd) + `<br><br> <h3>${this.currentPage}<h3>`;
    }


    jumpTo(page) { // find
        page = +this.jumpInput.value;
        if (page == 0) {
            this.findInput.removeAttribute('disabled');
            this.btnNext.removeAttribute('disabled');
            this.btnPrev.removeAttribute('disabled');
            this.currentPage = page;
            this.pageStart = 0;
            this.pageEnd = 200;
            localStorage.setItem('page', `${this.currentPage}`);
            return this.p.innerHTML = this.text.substring(this.pageStart, this.pageEnd) + `<br><br> <h3>${this.currentPage}<h3>`;
        } else {
            this.findInput.removeAttribute('disabled');
            this.btnNext.removeAttribute('disabled');
            this.btnPrev.removeAttribute('disabled');
            this.currentPage = page;
            this.pageStart = 200 * page;
            this.pageEnd = this.pageStart + 200;
            localStorage.setItem('page', `${this.currentPage}`);
            return this.p.innerHTML = this.text.substring(this.pageStart, this.pageEnd) + `<br><br> <h3>${this.currentPage}<h3>`;
        }
    }

    find(word) { 
        this.p.innerHTML =  this.text.substring(this.pageStart, this.pageEnd).replace(new RegExp(word,'gi'), `<span style="background-color:red">${word.toUpperCase()}</span>`) + ` <br><br> <h3>${this.currentPage}</h3>`;
    }

    continueReading(page) {
        if (page == 0) {
            this.currentPage = page;
            this.pageStart = 0;
            this.pageEnd = 200;
            return this.p.innerHTML = this.text.substring(this.pageStart, this.pageEnd) + `<br><br> <h3>${this.currentPage}<h3>`;
        } else {
            this.currentPage = page;
            this.pageStart = 200 * page;
            this.pageEnd = this.pageStart + 200;
            return this.p.innerHTML = this.text.substring(this.pageStart, this.pageEnd) + `<br><br> <h3>${this.currentPage}<h3>`;
        }
    }

    continue() { 
        this.findInput.removeAttribute('disabled');
        this.btnNext.removeAttribute('disabled');
        this.btnPrev.removeAttribute('disabled');
        this.continueReading(parseInt(localStorage.getItem('page')));
    }


    author() {
        this.h2.innerHTML = `Author: ${this.bookAuthor}`
    }

    price() {
        this.h3.innerHTML = `Price: ${this.bookPrice}`
    }
}


 let book = new Book('Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичный образ жизни. Однажды одна маленькая строчка рыбного текста по имени Lorem ipsum решила выйти в большой мир грамматики. Великий Оксмокс предупреждал ее о злых запятых, диких знаках вопроса и коварных точках с запятой, но текст не дал сбить себя с толку. Он собрал семь своих заглавных букв, подпоясал инициал за пояс и пустился в дорогу. Взобравшись на первую вершину курсивных гор, бросил он последний взгляд назад, на силуэт своего родного города Буквоград, на заголовок деревни Алфавит и на подзаголовок своего переулка Строчка. Грустный риторический вопрос скатился по его щеке и он продолжил свой путь. По дороге встретил текст рукопись. Она предупредила его: «В моей стране все переписывается по несколько раз. Единственное, что от меня осталось, это приставка «и». Возвращайся ты лучше в свою безопасную страну». Не послушавшись рукописи, наш текст продолжил свой путь. Вскоре ему повстречался коварный составитель рекламных текстов, напоивший его языком и речью и заманивший в свое агенство, которое использовало его снова и снова в своих проектах. И если его не переписали, то живет он там до сих пор. Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу Семантика большого языкового океана. Маленький ручеек Даль журчит по всей стране и обеспечивает ее всеми необходимыми правилами. Эта парадигматическая страна, в которой жаренные члены предложения залетают прямо в рот. Даже всемогущая пунктуация не имеет власти над рыбными текстами, ведущими безорфографичны', "Vova Kachmar", 50);

// let book1 = new Book('https://my-json-server.typicode.com/Nierdhaza/JSON/posts/1', "gag", 50);

book.methods();
book.author();
book.price();


