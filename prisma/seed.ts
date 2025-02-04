/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();
const extraAdditions = { size: 40, unit: 'cm', color: 'red' };

async function main() {
  const hashedPassword = await argon.hash('password');
  const user = await prisma.user.create({
    data: {
      name: 'Gs9ja Admin',
      email: 'admin@girliestore9ja.com',
      password: hashedPassword,
      role: 'admin',
      shops: {
        create: {
          name: 'Admin Shop',
          address: 'No 1, Admin Street FCT Abuja',
          description:
            'This shop was built as a result of seeding and been lazy',
          photo_url: 'https://i.imgur.com/aD70j8k.jpeg',
        },
      },
    },
  });
  const CURRENT_SHOP = await prisma.shop.findFirst({
    where: { name: 'Admin Shop' },
  });
  const categories = await prisma.category.createMany({
    data: [{ name: 'Clothing' }, { name: 'Footwear' }, { name: 'Accessories' }],
  });
  const subCategories = await prisma.category
    .findFirst({
      where: { name: 'Clothing' },
    })
    .then(
      async (category) =>
        await prisma.subCategory.createMany({
          data: [
            { name: 'Tops', categoryId: category.id },
            { name: 'Dresses', categoryId: category.id },
            { name: 'Bottoms', categoryId: category.id },
            { name: 'Outerwear', categoryId: category.id },
            { name: 'Activewear', categoryId: category.id },
          ],
        }),
    );
  const productForTops = await prisma.subCategory
    .findFirst({
      where: { name: 'Tops' },
    })
    .then(
      async (subCategory) =>
        await prisma.product.createMany({
          data: [
            {
              name: 'First Top',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for tops',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              size: 40,
              unit: 'cm',
              color: 'red',
            },
            {
              name: 'Second Top',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for tops',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              size: 40,
              unit: 'cm',
              color: 'red',
            },
            {
              name: 'Third Top',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for tops',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              size: 40,
              unit: 'cm',
              color: 'red',
            },
            {
              name: 'Fourth Top',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for tops',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              size: 40,
              unit: 'cm',
              color: 'red',
            },
            {
              name: 'Fifth Top',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for tops',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              size: 40,
              unit: 'cm',
              color: 'red',
            },
            {
              name: 'Sixth Top',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for tops',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              size: 40,
              unit: 'cm',
              color: 'red',
            },
          ],
        }),
    );
  const productForDresses = await prisma.subCategory
    .findFirst({
      where: { name: 'Dresses' },
    })
    .then(
      async (subCategory) =>
        await prisma.product.createMany({
          data: [
            {
              name: 'First Dress',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for dress',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Second Dress',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Dress',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Third Dress',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Dress',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Fourth Dress',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Dress',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Fifth Dress',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Dress',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Sixth Dress',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Dress',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
          ],
        }),
    );
  const productForBottoms = await prisma.subCategory
    .findFirst({
      where: { name: 'Bottoms' },
    })
    .then(
      async (subCategory) =>
        await prisma.product.createMany({
          data: [
            {
              name: 'First Bottom',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Bottom',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Second Bottom',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Bottom',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Third Bottom',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Bottom',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Fourth Bottom',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Bottom',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Fifth Bottom',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Bottom',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
            {
              name: 'Sixth Bottom',
              categoryId: subCategory.categoryId,
              subCategoryId: subCategory.id,
              description: 'This is a description for Bottom',
              shopId: CURRENT_SHOP.id,
              price: Number((Math.random() * 10000).toFixed(2)),
              quantity: (Math.random() + 1) * 100,
              ...extraAdditions,
            },
          ],
        }),
    );
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
