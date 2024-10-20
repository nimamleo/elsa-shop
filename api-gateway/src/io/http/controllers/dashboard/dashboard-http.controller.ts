import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AbstractHttpController } from '@common/http/abstract-http.controller';
import { CreateProductRequest } from './model/create-product.model';
import { ProductService } from '@product/application/product/service/product.service';
import { AuthGuard } from '../../guard/auth.guard';
import { RBACGuard } from '../../guard/rbac.guard';
import { RBAC } from '../../decorators/rbac.decorator';
import { Role } from '@user/application/user/enum/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Ok } from '@common/result';
import { Response } from 'express';
import { CreateCategoryRequest } from './model/create-category.model';

@Controller('dashboard')
@UseGuards(AuthGuard, RBACGuard)
@ApiTags('dashboard')
@ApiBearerAuth()
export class DashboardHttpController extends AbstractHttpController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Post('product')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  async createProduct(
    @Res() response: Response,
    @Body() body: CreateProductRequest,
  ) {
    const res = await this.productService.createProduct({
      title: body.title,
      description: body.description,
      price: body.price,
      country: body.country,
      quality: body.quality,
      category: { id: body.categoryId },
      info: [],
    });
    this.sendResult(response, Ok(true));
  }

  @Post('category')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  @UsePipes(ValidationPipe)
  async createCategory(
    @Res() response: Response,
    @Body() body: CreateCategoryRequest,
  ) {
    const res = await this.productService.CreateCategory({
      title: body.title,
      slug: body.slug,
      products: [],
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }
    this.sendResult(response, Ok(true));
  }
}
