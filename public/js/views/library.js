var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: $('#books'),

    initialize: function(initialBooks) {
        this.collection = new app.Library(initialBooks);
        this.render();
        this.listenTo(this.collection, 'add', this.renderBook);
    },

    events: {
        'click #add': 'addBook'
    },

    addBook: function(e) {
        e.preventDefault();
        var formData = {};
        $('.form-horizontal div').children('input').each(function(i, el) {
            if ($(el).val() != '') {
                formData[el.id] = $(el).val();
            }
        });
        var Book = new app.Book(formData);
        this.collection.add(Book);
    },
    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function(item) {
            this.renderBook(item);
        }, this);
    },
    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function(item) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append(bookView.render().el);
    }

});
