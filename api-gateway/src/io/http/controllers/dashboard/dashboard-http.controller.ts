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
import {
  GetProductQuery,
  GetProductResponse,
} from './model/get-product-list.model';
import { CommentOrderBy } from '@comment/application/comment/database/enum/comment-order-by.enum';
import { Pagination } from '@common/pagination/pagination.model';
import { IPaginatedResult } from '@common/pagination/paginated-result.interface';
import { PaymentService } from '@payment/application/payment/service/payment.service';
import { PaymentOrderBy } from '@payment/application/payment/enum/payment-order-by.enum';
import { GetProductBy } from './enum/get-product-list.enum';
import { ProductOrderBy } from '@product/application/product/enum/product-order-by.enum';
import { IProductEntity } from '@product/application/product/models/product.model';

@Controller('dashboard')
@UseGuards(AuthGuard, RBACGuard)
@UsePipes(ValidationPipe)
@ApiTags('dashboard')
@ApiBearerAuth()
export class DashboardHttpController extends AbstractHttpController {
  constructor(
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
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
      info: body.info.map((x) => ({
        color: x.color,
        size: x.size,
        count: x.count,
      })),
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
        info: res.value.info.map((x) => ({
          size: x.size,
          color: x.color,
          count: x.count,
        })),
        createdAt: res.value.createdAt.toISOString(),
      }),
    );
  }

  @Get('products')
  async getProductList(
    @Res() response: Response,
    @Query() query: GetProductQuery,
  ) {
    const pagination = new Pagination(1);

    let productIds: string[] = [];
    if (query.orderBy == GetProductBy.SCORE) {
      const commentProductIdsRes =
        await this.commentService.getCommentProductIds(
          query.orderType,
          CommentOrderBy.SCORE,
          {
            skip: pagination.getSkip(),
            limit: pagination.getLimit(),
          },
        );
      if (commentProductIdsRes.isError()) {
        this.sendResult(response, commentProductIdsRes);
        return;
      }

      productIds = commentProductIdsRes.value.list;
    } else if (query.orderBy == GetProductBy.SALE) {
      const paymentProductIdsRes =
        await this.paymentService.getPaymentProductIds(
          {
            skip: pagination.getSkip(),
            limit: pagination.getLimit(),
          },
          query.orderType,
          PaymentOrderBy.SALE,
        );

      if (paymentProductIdsRes.isError()) {
        this.sendResult(response, paymentProductIdsRes);
        return;
      }
      productIds = paymentProductIdsRes.value.list;
    }

    const productListRes = await this.productService.getProductList({
      limitation: {
        skip: 0,
        limit: productIds.length,
      },
      productIds: productIds,
      orderType: query.orderType,
      orderBy:
        query.orderBy == GetProductBy.CREATED_AT
          ? ProductOrderBy.CREATED_AT
          : ProductOrderBy.PRICE,
    });
    if (productListRes.isError()) {
      this.sendResult(response, productListRes);
      return;
    }

    let result: IProductEntity[] = [];
    for (const x of productIds) {
      const target = productListRes.value.list.find(
        (product) => product.id == x,
      );
      if (target) {
        result.push(target);
      }
    }
    if (result.length == 0) {
      result = productListRes.value.list;
    }

    this.sendResult(
      response,
      Ok<IPaginatedResult<GetProductResponse>>({
        list: result.map((x) => ({
          id: x.id,
          title: x.title,
          description: x.description,
          price: x.price,
          country: x.country,
          quality: x.quality,
          info: x.info.map((i) => ({
            size: i.size,
            color: i.color,
            count: i.count,
          })),
          createdAt: x.createdAt.toISOString(),
          category: { id: x.category.id },
        })),
        total: productListRes.value.total,
        page: productListRes.value.page,
        pageSize: productListRes.value.pageSize,
      }),
    );
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
