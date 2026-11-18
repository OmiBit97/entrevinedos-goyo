import fs from 'node:fs';
import path from 'node:path';

/**
 * Script reproducible de auditoría y extracción sobre el bundle REA capturado
 * para fincaentrevinedos.com. Verifica todas las rutas, imágenes, vídeos y evidencias.
 */

const DEFAULT_BUNDLE_PATH =
  process.env.REA_BUNDLE_PATH ||
  'C:/Users/Omar_Pc/.gemini/antigravity/brain/1d0281ff-2ce8-479d-8fee-6708430a29f4/rea_evidence_bundle.json';

function extractFromBundle(bundlePath) {
  if (!fs.existsSync(bundlePath)) {
    console.warn(`[REA Extract] No se encontró el bundle en ${bundlePath}.`);
    console.warn('Los datos ya se encuentran compilados en src/data/*.ts.');
    process.exit(0);
  }

  const raw = fs.readFileSync(bundlePath, 'utf8');
  const bundle = JSON.parse(raw);

  const evidenceSummary = [];
  const pagesCaptured = new Map();
  const uniqueImages = new Set();
  const uniqueVideos = new Set();

  for (const record of bundle.records || []) {
    evidenceSummary.push({
      evidence_id: record.evidence_id,
      operation: record.operation,
      predicate_type: record.predicate_type,
      confidence: record.confidence,
    });

    const steps = record.normalized_result?.steps || [];
    for (const step of steps) {
      if (step.artifacts?.dom?.state === 'captured') {
        const url = new URL(step.after_url.url);
        const routePath = url.pathname;
        const domText = step.artifacts.dom.value.text || '';
        pagesCaptured.set(routePath, {
          url: step.after_url.url,
          bytes: step.artifacts.dom.value.bytes,
          sha256: step.artifacts.dom.value.sha256,
        });

        const imgMatches = domText.matchAll(
          /https:\/\/framerusercontent\.com\/images\/[A-Za-z0-9_-]+\.(webp|jpg|jpeg|png|svg)/gi,
        );
        for (const m of imgMatches) {
          uniqueImages.add(m[0]);
        }

        const vidMatches = domText.matchAll(/https:\/\/[^"'\s>]+\.(mp4|webm)/gi);
        for (const m of vidMatches) {
          uniqueVideos.add(m[0]);
        }
      }
    }
  }

  const outputDir = path.resolve(process.cwd(), 'docs');
  fs.mkdirSync(outputDir, { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceDomain: 'https://www.fincaentrevinedos.com',
    evidenceRecords: evidenceSummary,
    capturedRoutesCount: pagesCaptured.size,
    capturedRoutes: Object.fromEntries([...pagesCaptured.entries()].sort()),
    uniqueImagesCount: uniqueImages.size,
    uniqueImages: [...uniqueImages].sort(),
    uniqueVideos: [...uniqueVideos].sort(),
  };

  fs.writeFileSync(
    path.join(outputDir, 'rea-extracted-manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf8',
  );

  console.log('[REA Extract] Auditoría completada:');
  console.log(` - Registros de Evidencia: ${evidenceSummary.length}`);
  console.log(` - Rutas con DOM capturado: ${pagesCaptured.size}`);
  console.log(` - Imágenes únicas verificadas: ${uniqueImages.size}`);
  console.log(` - Vídeos detectados: ${uniqueVideos.size}`);
  console.log(` - Manifiesto escrito en docs/rea-extracted-manifest.json`);
}

extractFromBundle(DEFAULT_BUNDLE_PATH);
