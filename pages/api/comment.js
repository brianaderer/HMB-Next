export default async function commentHandler(req,res){
    const body = JSON.parse(req.body);
    if(!body.author || !body.authorEmail || !body.content || !body.postId) {
        return res.status(400).json({message: 'all fields are required'});
    }
}