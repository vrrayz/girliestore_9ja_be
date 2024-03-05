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

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.createCategory(categoryDto);
  }

  @Get(':id')
  showShop(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findCategory(id);
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
