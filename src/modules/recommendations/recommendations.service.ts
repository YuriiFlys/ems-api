import { Injectable } from '@nestjs/common';
import { RecommendationsRepository } from './recommendations.repository';

const WEIGHTS = { category: 0.5, date: 0.3, geo: 0.2 };
const MAX_DATE_DIFF_DAYS = 365;
const MAX_GEO_DIST_KM = 2000;

@Injectable()
export class RecommendationsService {
  constructor(private recommendationsRepo: RecommendationsRepository) {}

  async getRecommendations(eventId: string) {
    const source = await this.recommendationsRepo.findEvent(eventId);
    if (!source) return [];

    const candidates = await this.recommendationsRepo.findCandidates(eventId);

    const scored = candidates.map((candidate) => ({
      ...candidate,
      _score: this.score(source, candidate),
    }));

    return scored
      .sort((a, b) => b._score - a._score)
      .slice(0, 5)
      .map(({ _score, ...event }) => event);
  }

  private score(
    source: { category: string; date: Date; latitude: number | null; longitude: number | null },
    candidate: { category: string; date: Date; latitude: number | null; longitude: number | null },
  ): number {
    const categoryScore = source.category === candidate.category ? 1 : 0;

    const daysDiff = Math.abs(
      (new Date(source.date).getTime() - new Date(candidate.date).getTime()) / 86_400_000,
    );
    const dateScore = Math.max(0, 1 - daysDiff / MAX_DATE_DIFF_DAYS);

    let geoScore = 0;
    if (
      source.latitude != null && source.longitude != null &&
      candidate.latitude != null && candidate.longitude != null
    ) {
      const distKm = this.haversine(
        source.latitude, source.longitude,
        candidate.latitude, candidate.longitude,
      );
      geoScore = Math.max(0, 1 - distKm / MAX_GEO_DIST_KM);
    }

    return (
      WEIGHTS.category * categoryScore +
      WEIGHTS.date * dateScore +
      WEIGHTS.geo * geoScore
    );
  }

  /** Haversine formula — returns distance in km */
  private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }
}

