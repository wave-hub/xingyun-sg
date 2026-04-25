/**
 * POST: 計算八字命盤
 * 
 * 路由: /api/destiny/bazi/calculate
 */

import { NextRequest, NextResponse } from 'next/server';
import { BirthInfo, DestinyResponse, BaziChart } from '@/lib/destiny/types';
import { buildBaziChart } from '@/lib/destiny/bazi/chart-builder';

function validateBirthInfo(body: unknown): { valid: boolean; birthInfo?: BirthInfo; error?: string } {
  const info = body as Record<string, unknown>;

  if (!info.birthInfo) {
    return { valid: false, error: '缺少 birthInfo 字段' };
  }

  const birthInfo = info.birthInfo as BirthInfo;

  if (!birthInfo.birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(birthInfo.birthDate)) {
    return { valid: false, error: 'birthDate 格式錯誤，需為 YYYY-MM-DD' };
  }

  if (!birthInfo.birthTime || !/^\d{2}:\d{2}$/.test(birthInfo.birthTime)) {
    return { valid: false, error: 'birthTime 格式錯誤，需為 HH:mm' };
  }

  if (!['male', 'female'].includes(birthInfo.gender)) {
    return { valid: false, error: 'gender 需為 male 或 female' };
  }

  const date = new Date(birthInfo.birthDate);
  const year = date.getFullYear();
  if (year < 1900 || year > 2100) {
    return { valid: false, error: '出生年份需在 1900-2100 之間' };
  }

  return { valid: true, birthInfo };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { valid, birthInfo, error } = validateBirthInfo(body);

    if (!valid || !birthInfo) {
      return NextResponse.json<DestinyResponse<null>>({
        success: false,
        error: error || '輸入驗證失敗',
      }, { status: 400 });
    }

    const chart: BaziChart = buildBaziChart(birthInfo);

    return NextResponse.json<DestinyResponse<BaziChart>>({
      success: true,
      data: chart,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '八字命盤計算失敗';
    return NextResponse.json<DestinyResponse<null>>({
      success: false,
      error: message,
    }, { status: 500 });
  }
}
