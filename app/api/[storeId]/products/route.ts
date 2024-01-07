import { prismadb } from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      images,
      colorId,
      sizeId,
      isFeatured,
      isArchive,
      categoryId,
    } = body;
    if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
    
  
      if (!name) {
        return new NextResponse("Name is required", { status: 400 });
      }
  
      if (!images || !images.length) {
        return new NextResponse("Images are required", { status: 400 });
      }
  
      if (!price) {
        return new NextResponse("Price is required", { status: 400 });
      }
  
      if (!categoryId) {
        return new NextResponse("Category id is required", { status: 400 });
      }
  
      if (!colorId) {
        return new NextResponse("Color id is required", { status: 400 });
      }
  
      if (!sizeId) {
        return new NextResponse("Size id is required", { status: 400 });
      }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }
    const billboard = await prismadb.product.create({
      data: {
        name,
        price,
        isArchive,
        isFeatured,
        categoryId,
        colorId,
        sizeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log(`[PRODUCT_POST]`, error);
    return new NextResponse(`Internal Error`, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const isFeatured = searchParams.get('isFeatured');
    const isArchive = searchParams.get('isArchive');
    if (!params.storeId) {
      return new NextResponse('StoreId is required', { status: 400 });
    }
    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchive: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(`[PRODUCT_GET]`, error);
    return new NextResponse(`Internal Error`, { status: 500 });
  }
}
