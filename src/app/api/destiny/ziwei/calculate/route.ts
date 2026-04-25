/**
 * POST: 計算紫微斗數命盤
 * 
 * 路由: /api/destiny/ziwei/calculate
 */

import { NextRequest, NextResponse } from 'next/server';
import { BirthInfo, DestinyResponse, ZiWeiChart } from '@/lib/destiny/types';
import { buildZiWeiChart } from '@/lib/destiny/ziwei/chart-builder';

/** 驗證出生信息 */
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

  if (!['solar', 'lunar'].includes(birthInfo.calendarType)) {
    return { valid: false, error: 'calendarType 需為 solar 或 lunar' };
  }

  // 驗證日期合理性
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

    const chart: ZiWeiChart = buildZiWeiChart(birthInfo);

    return NextResponse.json<DestinyResponse<ZiWeiChart>>({
      success: true,
      data: chart,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : '紫微命盤計算失敗';
    return NextResponse.json<DestinyResponse<null>>({
      success: false,
      error: message,
    }, { status: 500 });
  }
}
