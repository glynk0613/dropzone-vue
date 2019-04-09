const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const mkdirp = require('mkdirp')
const uuidv4 = require('uuid/v4')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var Post = require('../models/posts')
const uploadPath = 'uploaded'
const upload = multer({
  dest: uploadPath
})

mkdirp.sync(uploadPath)
const handleError = (err, res) => {
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!')
}
var publicDir = require('path').join(__dirname, '../' + uploadPath)
app.use(express.static(publicDir))
const perPage = 8

var mongoose = require('mongoose')

var DATABASE_URL = process.env.DATABASE_URL || 'http://localhost'
mongoose.connect(`mongodb://${DATABASE_URL}/posts`, {
  useNewUrlParser: true
})

var db = mongoose.connection

db.on('error', function (error) {
  if (error.message && error.message.match(/failed to connect to server .* on first connect/)) {
    setTimeout(function () {
      mongoose.connect(`mongodb://${DATABASE_URL}/posts`, {
        useNewUrlParser: true
      }).catch(() => {
        // empty catch avoids unhandled rejections
      })
    }, 20 * 1000)
  } else {
    // Some other error occurred.  Log it.
    console.error(new Date(), String(error))
  }
})

db.once('open', function (callback) {
  console.log('Connection Succeeded')
})

app.post('/upload', upload.single('file'), (req, res) => {
  const tempPath = req.file.path
  const extName = path.extname(req.file.originalname).toLowerCase()
  const fileName = uuidv4() + extName
  const targetPath = path.join(__dirname, `../${uploadPath}/${fileName}`)
  if (extName === '.png' || extName === '.jpg' || extName === '.jpeg' || extName === '.gif') {
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res)
      var description = req.body.description
      var newPost = new Post({
        url: fileName,
        description: description,
        likes: [],
        date: new Date()
      })
      newPost.save(function (error) {
        if (error) return handleError(error, res)
        res
          .status(200)
          .contentType('text/plain')
          .end('File uploaded!')
      })
    })
  } else {
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res)
      res
        .status(403)
        .contentType('text/plain')
        .end('Only .png|.jpg|.gif files are allowed!')
    })
  }
})

app.get('/posts/:pageNumber', async (req, res) => {
  const getTotalRecords = () => new Promise(resolve => {
    Post.count({}, (err, count) => {
      resolve(count)
    })
  })
  var totalRecords = await getTotalRecords()
  var currentPage = req.params.pageNumber ? req.params.pageNumber : 1
  var totalPages = Math.ceil(totalRecords / perPage)
  Post.find({}, 'url description date likes', function (error, posts) {
    if (error) {
      console.error(error)
    }
    res.send({
      perPage: perPage,
      totalPages: totalPages,
      posts: posts
    })
  }).sort({
    _id: -1
  }).skip(perPage * (currentPage - 1)).limit(perPage)
})

// Update a post
app.put('/like/:id', (req, res) => {
  var db = req.db
  Post.findById(req.params.id, 'url description date likes', function (error, post) {
    if (error) {
      console.error(error)
    }
    var likesList = post.likes
    var index = likesList.indexOf(req.body.guid)
    if (index < 0) {
      likesList.push(req.body.guid)
    } else {
      likesList.splice(index, 1)
    }
    post.likes = likesList
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        likes: post.likes
      })
    })

  })
})

app.get('/post/:id', (req, res) => {
  var db = req.db
  Post.findById(req.params.id, 'url description date', function (error, post) {
    if (error) {
      console.error(error)
    }
    res.send(post)
  })
})

app.put('/posts/:id', (req, res) => {
  var db = req.db
  Post.findById(req.params.id, 'description date', function (error, post) {
    if (error) {
      console.error(error)
    }
    post.description = req.body.description
    post.date = new Date()
    post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
})

app.delete('/posts/:id', (req, res) => {
  var db = req.db
  Post.remove({
    _id: req.params.id
  }, function (err, post) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
})

app.listen(process.env.PORT || 8081)