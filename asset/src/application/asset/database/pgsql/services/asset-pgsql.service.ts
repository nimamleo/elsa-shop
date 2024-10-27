import { Injectable } from '@nestjs/common';
import { IAssetDatabaseProvider } from '../../provider/asset.provider';

@Injectable()
export class AssetPgsqlService implements IAssetDatabaseProvider {}
