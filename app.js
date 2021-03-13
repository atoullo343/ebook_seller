const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const app = express()

// handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// set static folder
app.use(express.static(`${__dirname}/public`))

// routes
app.use('/', require('./routes/index'))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))