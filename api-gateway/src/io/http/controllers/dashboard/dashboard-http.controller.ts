import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Err, Ok } from '@common/result';
import { Response } from 'express';
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
} from './model/create-category.model';
import { GetCategoryListResponse } from './model/get-category-list.model';
import { CommentService } from '@comment/application/comment/service/comment.service';
import {
  GetProductRequest,
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
import { FilesInterceptor } from '@nestjs/platform-express';
import { AssetService } from '@asset/application/asset/service/asset.service';
import {
  UploadFilesList,
  UploadFilesRequest,
  UploadFilesResponse,
} from './model/upload-files.model';
import { GenericStatusCodes } from '@common/enums/status.enum';
import { Multer } from 'multer';
import { APP_CONFIG_TOKEN, IAppConfig } from '../../../../app.config';
import { ConfigService } from '@nestjs/config';
import {
  CreateColorRequest,
  CreateColorResponse,
} from './model/create-color.model';
import {
  CreateSizeRequest,
  CreateSizeResponse,
} from './model/create-size.model';
import { GetColorListResponse } from './model/get-color-list.model';
import { GetSizeListResponse } from './model/get-size-list.model';
import {
  CreateCountryRequest,
  CreateCountryResponse,
} from './model/create-country.model';
import {
  CreateQualityRequest,
  CreateQualityResponse,
} from './model/create-quality.model';
import { GetCountryListResponse } from './model/get-country-list.model';
import { GetQualityListResponse } from './model/get-quality-list.model';

@Controller('dashboard')
@ApiTags('dashboard')
export class DashboardHttpController extends AbstractHttpController {
  private readonly appConfig: IAppConfig;
  constructor(
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
    private readonly commentService: CommentService,
    private readonly assetService: AssetService,
    configService: ConfigService,
  ) {
    super();
    this.appConfig = configService.get(APP_CONFIG_TOKEN);
  }

  @Post('color')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiResponse({ type: CreateColorResponse })
  @ApiBody({ type: CreateColorRequest })
  @UseGuards(AuthGuard, RBACGuard)
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  async createColor(
    @Res() response: Response,
    @Body() body: CreateColorRequest,
  ) {
    const res = await this.productService.createColor({
      hex: body.hex,
      title: body.title,
      info: [],
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<CreateColorResponse>({
        id: res.value.id,
        hex: res.value.hex,
        title: res.value.title,
        createdAt: res.value.createdAt.toISOString(),
      }),
    );
  }

  @Post('size')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiResponse({ type: CreateSizeResponse })
  @ApiBody({ type: CreateSizeRequest })
  @UseGuards(AuthGuard, RBACGuard)
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  async createSize(@Res() response: Response, @Body() body: CreateSizeRequest) {
    const res = await this.productService.createSize({
      title: body.title,
      info: [],
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<CreateSizeResponse>({
        id: res.value.id,
        title: res.value.title,
        createdAt: res.value.createdAt.toISOString(),
      }),
    );
  }

  @Post('country')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiResponse({ type: CreateSizeResponse })
  @ApiBody({ type: CreateSizeRequest })
  @UseGuards(AuthGuard, RBACGuard)
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  async createCountry(
    @Res() response: Response,
    @Body() body: CreateCountryRequest,
  ) {
    const res = await this.productService.createCountry({
      title: body.title,
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<CreateCountryResponse>({
        id: res.value.id,
        title: res.value.title,
        createdAt: res.value.createdAt.toISOString(),
      }),
    );
  }

  @Post('quality')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiResponse({ type: CreateSizeResponse })
  @ApiBody({ type: CreateSizeRequest })
  @UseGuards(AuthGuard, RBACGuard)
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  async createQuality(
    @Res() response: Response,
    @Body() body: CreateQualityRequest,
  ) {
    const res = await this.productService.createQuality({
      title: body.title,
    });
    if (res.isError()) {
      this.sendResult(response, res);
      return;
    }

    this.sendResult(
      response,
      Ok<CreateQualityResponse>({
        id: res.value.id,
        title: res.value.title,
        createdAt: res.value.createdAt.toISOString(),
      }),
    );
  }

  @Post('product')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiResponse({ type: CreateProductResponse })
  @ApiBody({ type: CreateProductRequest })
  @UseGuards(AuthGuard, RBACGuard)
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  async createProduct(
    @Res() response: Response,
    @Body() body: CreateProductRequest,
  ) {
    const createProduct = await this.productService.createProduct({
      title: body.title,
      description: body.description,
      price: body.price,
      country: { id: body.countryId },
      quality: { id: body.qualityId },
      category: { id: body.categoryId },
      info: body.info.map((x) => ({
        color: { id: x.colorId },
        size: { id: x.sizeId },
        count: x.count,
      })),
    });
    if (createProduct.isError()) {
      this.sendResult(response, createProduct);
      return;
    }

    this.sendResult(
      response,
      Ok<CreateProductResponse>({
        id: createProduct.value.id,
        title: createProduct.value.title,
        description: createProduct.value.description,
        price: createProduct.value.price,
        country: createProduct.value.country.id,
        quality: createProduct.value.quality.id,
        category: { id: createProduct.value.category.id },
        info: createProduct.value.info.map((x) => ({
          size: x.size.id,
          color: x.color.id,
          count: x.count,
        })),
        createdAt: createProduct.value.createdAt.toISOString(),
      }),
    );
  }

  @Post('products')
  async getProductList(
    @Res() response: Response,
    @Body() body: GetProductRequest,
  ) {
    const pagination = new Pagination(1);

    let productIds: string[] = [];
    if (body.orderBy == GetProductBy.SCORE) {
      const commentProductIdsRes =
        await this.commentService.getCommentProductIds(
          body.orderType,
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
    } else if (body.orderBy == GetProductBy.SALE) {
      const paymentProductIdsRes =
        await this.paymentService.getPaymentProductIds(
          {
            skip: pagination.getSkip(),
            limit: pagination.getLimit(),
          },
          body.orderType,
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
      orderType: body.orderType,
      orderBy:
        body.orderBy == GetProductBy.CREATED_AT
          ? ProductOrderBy.CREATED_AT
          : ProductOrderBy.PRICE,
      sizeIds: body.sizeIds,
      colorIds: body.colorIds,
      price: [body.minPrice, body.maxPrice],
    });
    if (productListRes.isError()) {
      this.sendResult(response, productListRes);
      return;
    }

    const assetList = await this.assetService.getAssetList(
      productListRes.value.list.map((x) => x.id),
      {
        limit: productIds.length,
        skip: 0,
      },
    );
    if (assetList.isError()) {
      this.sendResult(response, assetList);
      return;
    }

    let result: IProductEntity[] = [];
    for (const x of productIds) {
      const product = productListRes.value.list.find(
        (product) => product.id == x,
      );
      if (product) {
        result.push(product);
      }
    }
    if (result.length == 0) {
      result = productListRes.value.list;
    }

    this.sendResult(
      response,
      Ok<IPaginatedResult<GetProductResponse>>({
        list: result.map((x) => {
          const res: GetProductResponse = {
            id: x.id,
            title: x.title,
            description: x.description,
            price: x.price,
            country: { id: x.country.id, title: x.country.title },
            quality: { id: x.quality.id, title: x.quality.title },
            info: x.info.map((i) => ({
              size: { id: i.size.id, title: i.size.title },
              color: { id: i.color.id, title: i.color.title, hex: i.color.hex },
              count: i.count,
            })),
            images: ['https://c961156.parspack.net/images/tshirt'],
            // images: assetList.value.list
            //   .filter((i) => i.targetId == x.id)
            //   .map((i) => `${this.appConfig.baseUrl}/${i.directoryPath}`),
            createdAt: x.createdAt.toISOString(),
            category: { id: x.category.id, title: x.category.title },
          };

          return res;
        }),
        total: productListRes.value.total,
        page: pagination.getPage(),
        pageSize: pagination.getPageSize(),
      }),
    );
  }

  @Post('category')
  @RBAC(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiResponse({ type: CreateCategoryResponse })
  @ApiBody({ type: CreateCategoryRequest })
  @UseGuards(AuthGuard, RBACGuard)
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
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

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard, RBACGuard)
  @UsePipes(ValidationPipe)
  @ApiBearerAuth()
  async uploadFile(
    @Res() response: Response,
    @Body() body: UploadFilesRequest,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const filesRes: UploadFilesResponse[] = [];
    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) {
        this.sendResult(response, Err('file should be less than 2MB'));
        return;
      }

      const validMimeTypes = ['image/png', 'image/jpeg'];
      if (!validMimeTypes.includes(file.mimetype)) {
        this.sendResult(response, Err('file can be PNG or JPEG'));
        return;
      }

      const uploadRes = await this.assetService.createFile({
        name: file.originalname,
        size: file.size,
        directoryPath: null,
        mimetype: file.mimetype,
        buffer: file.buffer,
        isPoster: false,
        targetId: body.productId,
      });
      if (uploadRes.isError()) {
        this.sendResult(response, uploadRes);
        return;
      }

      filesRes.push({
        id: uploadRes.value.id,
        name: uploadRes.value.name,
        size: uploadRes.value.size,
        targetId: uploadRes.value.targetId,
        mimetype: uploadRes.value.mimetype,
        directoryPath: uploadRes.value.directoryPath,
        isPoster: uploadRes.value.isPoster,
      });
    }

    if (filesRes.length !== files.length) {
      this.sendResult(
        response,
        Err('something went wrong', GenericStatusCodes.INTERNAL),
      );
      return;
    }

    this.sendResult(
      response,
      Ok<UploadFilesList>({
        list: filesRes.map((x) => ({
          id: x.id,
          name: x.name,
          size: x.size,
          targetId: x.targetId,
          mimetype: x.mimetype,
          directoryPath: x.directoryPath,
          isPoster: x.isPoster,
        })),
      }),
    );
  }

  @Get('color')
  async getColorList(@Res() response: Response) {
    const res = await this.productService.getColorList();
    if (res.isError()) {
      this.sendResult(response, res);
    }

    this.sendResult(
      response,
      Ok<GetColorListResponse>({
        list: res.value.map((x) => ({
          id: x.id,
          title: x.title,
          hex: x.hex,
          createdAt: x.createdAt.toISOString(),
        })),
      }),
    );
  }

  @Get('size')
  async getSizeList(@Res() response: Response) {
    const res = await this.productService.getSizeList();
    if (res.isError()) {
      this.sendResult(response, res);
    }

    this.sendResult(
      response,
      Ok<GetSizeListResponse>({
        list: res.value.map((x) => ({
          id: x.id,
          title: x.title,
          createdAt: x.createdAt.toISOString(),
        })),
      }),
    );
  }

  @Get('country')
  async getCountryList(@Res() response: Response) {
    const res = await this.productService.getCountryList();
    if (res.isError()) {
      this.sendResult(response, res);
    }

    this.sendResult(
      response,
      Ok<GetCountryListResponse>({
        list: res.value.map((x) => ({
          id: x.id,
          title: x.title,
          createdAt: x.createdAt.toISOString(),
        })),
      }),
    );
  }

  @Get('quality')
  async getQualityList(@Res() response: Response) {
    const res = await this.productService.getQualityList();
    if (res.isError()) {
      this.sendResult(response, res);
    }

    this.sendResult(
      response,
      Ok<GetQualityListResponse>({
        list: res.value.map((x) => ({
          id: x.id,
          title: x.title,
          createdAt: x.createdAt.toISOString(),
        })),
      }),
    );
  }
}
