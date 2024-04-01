import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Delete,
  Put,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductUsecase } from './product.usecase';
import { ProductModelDTO } from 'src/product/rest/product.model.dto';
import { OfferingRules } from '../service/offering';
import { Categories } from './categories';
import { detecteDiscountProducts } from '../service/discount.service';
import { FilterOptions } from '../service/generalFilter';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@ApiTags('product')
@Controller('product')
export class ProductResource {
  constructor(
    private productUseCase: ProductUsecase,
    private offeringRules: OfferingRules,
  ) {}
  @Get('/')
  @ApiOperation({ description: 'Get a products by tenant' })
  @ApiResponse({
    status: 200,
    description: 'Products found',
    type: ProductModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Products not found',
  })
  public async getAllProducts(
    @Req() request: Request,
  ): Promise<ProductModelDTO[] | null> {
    // const getProductsRules = this.offeringRules.getProducts(request);
    // return getProductsRules;
    const products = await this.productUseCase.getAllProducts(request);
    if (!products || products.length === 0) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  @Get('/pagination')
  @ApiResponse({ status: 200, type: 'ProductDTO' })
  @ApiResponse({ status: 404, description: 'Product was not found' })
  @ApiOperation({ summary: 'Get products by tenant' })
  public async getProductPerPage(
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') size: string,
  ): Promise<any> {
    const product: any = await this.productUseCase.getProductsPerPage(
      request,
      Number(page),
      Number(size),
    );

    if (!product) {
      throw new NotFoundException('Product was not found');
    }
    return product;
  }

  @Get('/:id')
  @ApiOperation({ description: 'Get a product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: ProductModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  public async getAllProductsById(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<ProductModelDTO[] | null> {
    const products = await this.productUseCase.getAllProductsById(id, request);
    const discountProducts = detecteDiscountProducts(products[0]);
    if (!discountProducts || discountProducts.length === 0) {
      throw new NotFoundException('Product not found');
    } else {
      return discountProducts;
    }
  }

  @Get('search/params')
  @ApiOperation({ description: 'Get a product by Params' })
  @ApiResponse({
    status: 200,
    description: 'Products by params found',
    type: ProductModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Product params not found',
  })
  public async getProductsByParams(
    @Query('status') status: string,
    @Req() request: Request,
    @Query('new') isNew: boolean,
    @Query('best') isBest: boolean,
    @Query('page') page: string,
    @Query('limit') pageSize: string,
  ): Promise<any> {
    const getProductsRules = this.offeringRules.getProductsParams(
      status,
      request,
      isNew,
      isBest,
      Number(page),
      Number(pageSize),
    );

    return getProductsRules;
  }

  @Post('/')
  @ApiBody({ type: ProductModelDTO, required: true })
  @ApiResponse({
    status: 201,
    description: 'New product created',
    type: ProductModelDTO,
  })
  @ApiOperation({ description: 'Create a product' })
  public async createProduct(
    @Body() productDTO: ProductModelDTO,
    @Req() request: Request,
  ): Promise<ProductModelDTO> {
    return await this.productUseCase.createProduct(productDTO, request);
  }

  @Post('/filters')
  @ApiBody({ type: ProductModelDTO, required: true })
  @ApiResponse({
    status: 201,
    description: 'Products found',
    type: ProductModelDTO,
  })
  @ApiOperation({ description: 'Get products by categories' })
  public async getByCategories(
    @Query('city') city: string,
    @Query('status') status: string,
    @Query('free-shipping') freeShipping: number,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('page') page: string,
    @Query('limit') size: string,
    @Body() categories: Categories,
    @Req() request: Request,
  ): Promise<any> {
    const getProducts = await this.offeringRules.getProductCategories(
      categories,
      request,
      city,
      status,
      minPrice,
      maxPrice,
      freeShipping,
      Number(page),
      Number(size),
    );
    return getProducts;
  }

  @Post('/category')
  @ApiBody({ type: 'ProductsDTO', required: true })
  @ApiResponse({
    status: 201,
    description: 'products found',
    type: 'ProductsDTO',
  })
  @ApiOperation({ description: 'Get products by categories' })
  public async getByTags(
    @Body() categories: Categories,
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') size: string,
    @Query('status') status: string,
    @Query('name') name: string,
  ): Promise<any> {
    const getProducts = await this.offeringRules.getByCategories(
      categories,
      request,
      Number(page),
      Number(size),
      status,
      name,
    );
    return getProducts;
  }

  @Put('/:id')
  @ApiResponse({ status: 200, type: 'Product update success' })
  @ApiResponse({ status: 404, description: 'The product cannot be edited' })
  @ApiOperation({ summary: 'Edit product' })
  public async putProduct(
    @Param('id') id: string,
    @Body() productDTO: any,
    @Req() request: Request,
  ): Promise<ProductModelDTO> {
    return await this.productUseCase.putProduct(productDTO, request, id);
  }

  @Put('/update/status')
  @ApiResponse({ status: 200, type: 'Product status update success' })
  @ApiResponse({
    status: 404,
    description: 'Product status cannot be updated',
  })
  @ApiOperation({ summary: 'Edit product status' })
  public async putProductStatus(
    @Query('product-id') productID: string,
    @Query('status') status: string,
    @Req() request: Request,
  ): Promise<ProductModelDTO> {
    return await this.productUseCase.putProductStatus(
      productID,
      status,
      request,
    );
  }

  @Put('/inventory')
  @ApiResponse({ status: 200, type: 'Product inventory update success' })
  @ApiResponse({
    status: 404,
    description: 'Product inventory cannot be updated',
  })
  @ApiOperation({ summary: 'Edit product status' })
  public async putProductInventory(
    @Query('product-id') productID: string,
    @Query('quantity') quantity: string,
    @Query('isSum') isSum: string,
    @Req() request: Request,
  ): Promise<ProductModelDTO> {
    return await this.productUseCase.putProductInventory(
      productID,
      Number(quantity),
      request,
      isSum,
    );
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, type: 'string' })
  @ApiResponse({ status: 404, description: 'Product to deleted not found' })
  @ApiOperation({ summary: 'Deleted product' })
  public async deleteProduct(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      return await this.productUseCase.deleteProduct(request, id);
    } catch (error) {
      throw new NotFoundException('Product not deleted');
    }
  }

  @Post('search')
  @ApiOperation({ description: 'Get a product by Params' })
  @ApiResponse({
    status: 200,
    description: 'Products by params found',
    type: ProductModelDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Product params not found',
  })
  public async searchFilter(
    @Query('status') status: string,
    @Query('text') textSearch: string,
    @Req() request: Request,
  ): Promise<any> {
    const getProductsRules = this.offeringRules.searchFilter(
      status,
      textSearch,
      request,
    );

    return getProductsRules;
  }

  @Get('single/offert')
  @ApiOperation({ description: 'Get a product with discount' })
  @ApiResponse({ status: 200, type: 'ProductDTO' })
  @ApiResponse({
    status: 404,
    description: 'Product with discount not found',
  })
  public async getDiscountProducts(
    @Query('status') status: string,
    @Req() request: Request,
    @Query('page') page: string,
    @Query('limit') pageSize: string,
  ): Promise<any> {
    const getProductsRules = this.offeringRules.getDiscountProducts(
      status,
      request,
      Number(page),
      Number(pageSize),
    );
    return getProductsRules;
  }

  @Post('filter/params')
  @ApiOperation({ description: 'Get a product with discount' })
  @ApiResponse({ status: 200, type: 'ProductDTO' })
  @ApiResponse({
    status: 404,
    description: 'Product with discount not found',
  })
  public async getFilterParams(
    @Query('status') status: string,
    @Req() request: Request,
    @Query('text_key') sentence: string,
    @Query('page') page: string,
    @Query('limit') pageSize: string,
    @Body() filterOptions: FilterOptions,
  ): Promise<any> {
    const getProductsRules = this.offeringRules.generalFilters(
      status,
      request,
      sentence,
      Number(page),
      Number(pageSize),
      filterOptions,
    );
    return getProductsRules;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Req() request: Request) {
    // Guardar datos en DynamoDB
    const importData = await this.productUseCase.saveDataToDynamoDB(
      file,
      request,
    );

    return importData;
  }

  @Get('/export/file')
  async exportProducts(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    // Guardar datos en DynamoDB
    const exportProducts = await this.productUseCase.exportProducts(
      request,
      response,
    );

    return exportProducts;
  }
}
