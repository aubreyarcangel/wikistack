const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/wikistack')

function generateUrlTitle (title) {
    if (title) {
      // Removes all non-alphanumeric characters from title
      // And make whitespace underscore
      return title.replace(/\s+/g, '_').replace(/\W/g, '');
    } else {
      // Generates random 5 letter string
      return Math.random().toString(36).substring(2, 7);
    }
  }

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
        
    },
    route: {
        type: Sequelize.VIRTUAL,
        get() {
            return `/wiki/${this.getDataValue('urlTitle')}`
        }
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    }
    // date: {
    //     type: Sequelize.DATE,
    //     defaultValue: Sequelize.NOW
    // }
    
}, {hooks: {
    beforeValidate: (page, options) => {
      page.urlTitle = generateUrlTitle(page.title)
    }
}
});

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  Page: Page,
  User: User,
  db: db

};
