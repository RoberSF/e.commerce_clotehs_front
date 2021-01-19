export class Post {

    constructor (
        public title: string,
        public intro?: string,
        public contenido?: string,
        public categoria?: string,
        public comentarios?: string,
        public date?: string,
        public idAuthor?: string,
        public img?: File,
        public _id?: string,
    ) { }

}