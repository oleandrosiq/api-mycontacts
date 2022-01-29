const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { order_by } = request.query;
    const categories = await CategoriesRepository.findAll(order_by);
    
    return response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;
    
    if (!name) return response.status(400).json({ error: 'Name is required' });

    const nameExists = await CategoriesRepository.findByName(name);
    if (nameExists) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const category = await CategoriesRepository.create({ name });

    return response.json(category);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);
    console.log({ category });
    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    return response.json(category);
  }

  async update(request, response) {
    const { id }  = request.params;
    const { name } = request.body;
    
    if (!name) return response.status(400).json({ error: 'Name not found' });

    const nameExists = await CategoriesRepository.findByName(name);
    
    if (nameExists) {
      return response.status(404).json({ error: 'This name is already in use' });
    }

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category not found' });
    }

    const updatedCategory = await CategoriesRepository.update(id, { name });
    
    return response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new CategoryController();