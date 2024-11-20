import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AbstractHttpController } from '@common/http/abstract-http.controller';
import { Response } from 'express';
import { AuthGuard } from '../../guard/auth.guard';
import { RBACGuard } from '../../guard/rbac.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductResponse } from '../dashboard/model/create-product.model';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import { ProductService } from '@product/application/product/service/product.service';
import { Ok } from '@common/result';
import { GetUserBasketResponse } from './model/get-user-basket.model';
import {
  AddToBasketRequest,
  AddToBasketResponse,
} from './model/add-to-basket.model';

@Controller('user')
@UseGuards(AuthGuard, RBACGuard)
@UsePipes(ValidationPipe)
@ApiTags('user')
@ApiBearerAuth()
export class UserHttpController extends AbstractHttpController {
  constructor(private readonly productService: ProductService) {
    super();
  }

  // @Get('basket')
  // @ApiResponse({ type: CreateProductResponse })
  // async getUserBasket(@Res() response: Response, @GetUserId() userId: string) {
  //   const res = await this.productService.getUserBasket(userId);
  //   if (res.isError()) {
  //     this.sendResult(response, res);
  //     return;
  //   }
  //
  //   let totalPrice = 0;
  //   for (const x of res.value) {
  //     totalPrice = totalPrice + x.product.price * x.count;
  //   }
  //
  //   this.sendResult(
  //     response,
  //     Ok<GetUserBasketResponse>({
  //       price: totalPrice,
  //       taxPrice: Math.floor(totalPrice * 0.1),
  //       totalPrice: Math.floor(totalPrice * 1.1),
  //       list: res.value.map((x) => ({
  //         count: x.count,
  //         size: x.info.size,
  //         color: x.info.color,
  //         country: x.product.country,
  //         price: x.product.price,
  //         id: x.id,
  //         image: null,
  //         quality: x.product.quality,
  //         title: x.product.title,
  //       })),
  //     }),
  //   );
  // }

  @Post('basket')
  async addToBasket(
    @Res() response: Response,
    @Body() body: AddToBasketRequest,
    @GetUserId() userId: string,
  ) {
    const res = await this.productService.addToBasket({
      userId: userId,
      count: body.count,
      product: { id: body.productId },
      info: { id: body.infoId },
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<AddToBasketResponse>({
        id: res.value.id,
        userId: res.value.userId,
        infoId: res.value.info.id,
        productId: res.value.product.id,
        count: res.value.count,
      }),
    );
  }
}
