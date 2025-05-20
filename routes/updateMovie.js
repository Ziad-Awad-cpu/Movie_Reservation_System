const express = require("express")
const { Movie } = require("../models");

const auth = require("../middleware/auth")

const router = express.Router();

//UPDATING A MOVIE IS AN ADMIN'S OPERATION ONLY

//Admin check
function isAdmin(req, res, next){
    if(req.user.role != "admin" ){
        return res.status(403).json({message: "Access denied. Admins only"})
    }
    next();
}

router.put("/:id", auth, isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await Movie.update(req.body, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: "Movie not found" });
      }
      
      res.json({ message: "Movie updated" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
module.exports = router;