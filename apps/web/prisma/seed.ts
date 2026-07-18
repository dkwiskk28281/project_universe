import { PrismaClient } from "@prisma/client";
import { knowledgeNodes } from "../lib/curriculum/knowledge-graph";
import { mvpLessons } from "../lib/curriculum/courses";
import { ratioDiagnosticQuestions } from "../lib/diagnostics/diagnostic-engine";

const prisma = new PrismaClient();

async function main() {
  await prisma.course.upsert({
    where: { id: "course-math-for-epi" },
    create: {
      id: "course-math-for-epi",
      slug: "math-for-epi",
      title: "수학 생존력에서 EPI gas ratio까지",
      description: "수포자 친화적으로 비율, 단위환산, 그래프, 함수, EPI 적용을 연결하는 첫 코스.",
      status: "published"
    },
    update: {}
  });

  await prisma.module.upsert({
    where: { id: "module-ratio-foundation" },
    create: {
      id: "module-ratio-foundation",
      courseId: "course-math-for-epi",
      title: "비율과 단위환산",
      order: 1
    },
    update: {}
  });

  for (const node of knowledgeNodes) {
    await prisma.knowledgeNode.upsert({
      where: { id: node.id },
      create: {
        id: node.id,
        slug: node.slug,
        titleKo: node.titleKo,
        titleEn: node.titleEn,
        domain: node.domain,
        level: node.level,
        learningObjectives: node.learningObjectives,
        estimatedMinutes: node.estimatedMinutes,
        masteryThreshold: node.masteryThreshold,
        theoryWeight: node.theoryWeight,
        practiceWeight: node.practiceWeight,
        applicationWeight: node.applicationWeight,
        tags: node.tags,
        status: "published"
      },
      update: {
        titleKo: node.titleKo,
        titleEn: node.titleEn,
        learningObjectives: node.learningObjectives,
        tags: node.tags
      }
    });
  }

  for (const node of knowledgeNodes) {
    for (const sourceId of node.prerequisites) {
      await prisma.knowledgeEdge.upsert({
        where: { sourceId_targetId_type: { sourceId, targetId: node.id, type: "prerequisite" } },
        create: { sourceId, targetId: node.id, type: "prerequisite" },
        update: {}
      });
    }
  }

  for (const lesson of mvpLessons) {
    await prisma.lesson.upsert({
      where: { id: lesson.id },
      create: {
        id: lesson.id,
        moduleId: "module-ratio-foundation",
        nodeId: lesson.nodeId,
        title: lesson.title,
        status: "published",
        blocks: {
          create: lesson.blocks.map((block, index) => ({ ...block, order: index + 1 }))
        }
      },
      update: {
        title: lesson.title,
        status: "published"
      }
    });
  }

  for (const question of ratioDiagnosticQuestions) {
    await prisma.exercise.upsert({
      where: { id: question.id },
      create: {
        id: question.id,
        nodeId: question.nodeId,
        prompt: question.prompt,
        choices: question.options,
        answer: { correctIndex: question.correctIndex, explanation: question.explanation },
        difficulty: question.difficulty,
        status: "published"
      },
      update: {
        prompt: question.prompt,
        choices: question.options,
        answer: { correctIndex: question.correctIndex, explanation: question.explanation }
      }
    });
  }
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
