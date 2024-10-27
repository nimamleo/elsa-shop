import { Inject, Injectable } from '@nestjs/common';
import {
  IAssetProvider,
  PARSPACK_BUCKET_TOKEN,
} from '@infrastructure/infrastructure/asset/providers/asset.provider';

@Injectable()
export class AssetService {
  constructor(
    @Inject(PARSPACK_BUCKET_TOKEN)
    private readonly assetService: IAssetProvider,
  ) {}
}
