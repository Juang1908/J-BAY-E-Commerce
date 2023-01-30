const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [ {model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json.apply(err);
  } 
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!categoryData) {
      res.status(404).json({ message: ' Cannot find the Product You are looking for'});
      return;
  }

    res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body
      // {product_id: req.body.product_id,}
      );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id',async (req, res) => {
  try {
    const categoryData = await Category.update({
      // product_id: req.body.product_id,
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);
  }catch (err){
    console.error(err);
    res.status(500).json({error: err.message});
  }
  
});


// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if (!categoryData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
 
});

module.exports = router;
