import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // view categories and sub categories
  @Get('')
  showCategories() {
    return this.categoryService.categories();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }
  // updates sub category
  @UseGuards(AuthGuard('jwt'))
  @Patch('subcategory/:id')
  updateSubCategory(
    @Body() data: CategoryDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categoryService.updateSubCategory(data, id);
  }

  // deletes sub category
  @UseGuards(AuthGuard('jwt'))
  @Delete('subcategory/:id')
  deleteSubCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteSubCategory(id);
  }

  // view category and sub categories
  @Get(':id')
  showShop(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findCategory(id);
  }

  // creates subcategory
  @UseGuards(AuthGuard('jwt'))
  @Post(':id/subcategory')
  createSubCategory(
    @Body() categoryDto: CategoryDto,
    @Param('id', ParseIntPipe) categoryId: number,
  ) {
    return this.categoryService.createSubCategory(categoryDto, categoryId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('edit/:id')
  edit(@Body() data: CategoryDto, @Param('id', ParseIntPipe) id: number) {
    return this.categoryService.updateCategory(data, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
