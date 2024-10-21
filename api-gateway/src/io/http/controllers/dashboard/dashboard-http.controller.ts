import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AbstractHttpController } from '@common/http/abstract-http.controller';
import {
  CreateProductRequest,
  CreateProductResponse,
} from './model/create-product.model';
import { ProductService } from '@product/application/product/service/product.service';
import { AuthGuard } from '../../guard/auth.guard';
import { RBACGuard } from '../../guard/rbac.guard';
import { RBAC } from '../../decorators/rbac.decorator';
import { Role } from '@user/application/user/enum/role.enum';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ok } from '@common/result';
import { Response } from 'express';
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
} from './model/create-category.model';
import { GetCategoryListResponse } from './model/get-category-list.model';
import { CommentService } from '@comment/application/comment/service/comment.service';
import { CommentOrderBy } from '@comment/application/comment/database/enum/comment-order-by.enum';
import { GetProductQuery } from './model/get-product.model';

@Controller('dashboard')
@UseGuards(AuthGuard, RBACGuard)
@UsePipes(ValidationPipe)
@ApiTags('dashboard')
@ApiBearerAuth()
export class DashboardHttpController extends AbstractHttpController {
  constructor(
    private readonly productService: ProductService,
    private readonly commentService: CommentService,
  ) {
    super();
  }

  @Post('product')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiResponse({ type: CreateProductResponse })
  @ApiBody({ type: CreateProductRequest })
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
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<CreateProductResponse>({
        id: res.value.id,
        title: res.value.title,
        description: res.value.description,
        price: res.value.price,
        country: res.value.country,
        quality: res.value.quality,
        category: { id: res.value.category.id },
        createdAt: res.value.createdAt.toISOString(),
      }),
    );
  }

  @Get('products')
  async getProductList(
    @Res() response: Response,
    @Query() query: GetProductQuery,
  ) {
    this.commentService.getComments({
      orderType: 'ASC',
      orderBy: CommentOrderBy.LIKE,
    });
  }

  @Post('category')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiResponse({ type: CreateCategoryResponse })
  @ApiBody({ type: CreateCategoryRequest })
  async createCategory(
    @Res() response: Response,
    @Body() body: CreateCategoryRequest,
  ) {
    const res = await this.productService.CreateCategory({
      title: body.title,
      products: [],
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<CreateCategoryResponse>({
        id: res.value.id,
        title: res.value.title,
        createdAt: res.value.createdAt.toISOString(),
      }),
    );
  }

  @Get('category')
  async getCategoryList(@Res() response: Response) {
    const res = await this.productService.getCategoryList();
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<GetCategoryListResponse>({
        list: res.value.map((x) => ({
          id: x.id,
          title: x.title,
          createdAt: x.createdAt.toISOString(),
        })),
      }),
    );
  }
}
