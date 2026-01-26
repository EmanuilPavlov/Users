import express from 'express';
import userRouter from './routes/userRoutes';
import sequelize from './util/database';
import methodOverride from 'method-override';
import path from 'path';

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use(express.static(path.join(__dirname, "../public")));
server.use(methodOverride("_method"));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/users', userRouter);
server.get('/', (req, res, next) => {
    res.render('users');
})

sequelize
    .sync()
    .then(() => {
        console.log('Database connected & tables created!');
        server.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });