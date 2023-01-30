const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [ {model: Product}],
    });
    res.status(200).json(tagData);
  } catch (err){
    res.status(500).json.apply(err);
  } 
});

  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}],
    });

    if (!tagData) {
      res.status(404).json({ message: ' Cannot find Tag!'});
      return;
  }

    res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body
      // {product_id: req.body.product_id,}
      );
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update({
      // product_id: req.body.product_id,
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);
  }catch (err){
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    if (!tagData) {
      res.status(404).json({ message: 'No tag found!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
