import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularProducts = await prismaClient.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    const salesSummary = await prismaClient.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    
    const purchaseSummary = await prismaClient.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    
    const expenseSummary = await prismaClient.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    
    const expenseByCategorySummaryRaw = await prismaClient.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));
    
    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    })
    
  } catch (error) {
    res.status(500).json({message: "Error retrieving dashboard metrics" });
  }
}