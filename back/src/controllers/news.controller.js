import { createService, findAllService } from "../services/news.service.js";



const create = async (req, res) => { 
    try {
        const {title, text, banner} = req.body

        if(!title || !banner || !text) {
            res.status(400).send({message: "Submit all fileds for registration"})
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId,
        })

        res.sendStatus(201);
    } catch(err) {
        res.status(500).send({message: err.message});
    }

};

const findAll = async (req, res) => {
    try {
        const news = await findAllService();
        if (news.length === 0){
            return res.status(400).send({
                message: "There are no registered news"
            })
        }
        res.send(news);

    }catch (err){
        res.status(500).send({message: err.message})
    }
};

export  {
    create, findAll 
}