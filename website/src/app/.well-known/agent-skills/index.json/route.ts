import { NextResponse } from 'next/server';

const BASE_SKILLS_URL = 'https://isitagentready.com/.well-known/agent-skills';

export const dynamic = 'force-static';

export function GET() {
  const index = {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: [
      {
        name: 'robots-txt',
        type: 'skill-md',
        description: 'Publish a valid robots.txt with User-agent directives per RFC 9309',
        url: `${BASE_SKILLS_URL}/robots-txt/SKILL.md`,
        digest: 'sha256:7e5e73a545bc778506458904303b07ac7eebd570e48ce9815ee5189efd859bb7',
      },
      {
        name: 'sitemap',
        type: 'skill-md',
        description: 'Publish an XML sitemap listing canonical URLs per the Sitemaps protocol',
        url: `${BASE_SKILLS_URL}/sitemap/SKILL.md`,
        digest: 'sha256:ec9f5fa80a85bfe4b8c2bd0a09899d0fc2b98b0cc144c79aaec632517dc739a0',
      },
      {
        name: 'ai-rules',
        type: 'skill-md',
        description: 'Add explicit User-agent entries for AI crawlers in robots.txt',
        url: `${BASE_SKILLS_URL}/ai-rules/SKILL.md`,
        digest: 'sha256:146b0163e496368aa2ad994d3bb0a72df793f8d1cb87a1745d83130cb67ea125',
      },
      {
        name: 'content-signals',
        type: 'skill-md',
        description: 'Declare AI content usage preferences with Content Signals in robots.txt',
        url: `${BASE_SKILLS_URL}/content-signals/SKILL.md`,
        digest: 'sha256:810108b0171c9c16ead091d5d7e9b5d0c72086b5dc6ef2b4e84fece01d72a91e',
      },
      {
        name: 'link-headers',
        type: 'skill-md',
        description: 'Add Link response headers for agent discovery per RFC 8288',
        url: `${BASE_SKILLS_URL}/link-headers/SKILL.md`,
        digest: 'sha256:a230108a9586ed530945b91d49d86163e38a6687ad1b08f60ec08e2cb99f1ed7',
      },
      {
        name: 'api-catalog',
        type: 'skill-md',
        description: 'Publish an API catalog for automated discovery per RFC 9727',
        url: `${BASE_SKILLS_URL}/api-catalog/SKILL.md`,
        digest: 'sha256:1d702680dd6b8de8362b9dab02ba355016a8daac65b18749a462b7774699db42',
      },
      {
        name: 'mcp-server-card',
        type: 'skill-md',
        description: 'Publish an MCP Server Card for agent discovery per SEP-1649',
        url: `${BASE_SKILLS_URL}/mcp-server-card/SKILL.md`,
        digest: 'sha256:9a1af2376a9741bc29f97ff40120a7f115c1618188d40f2c9674b729485bd0d8',
      },
      {
        name: 'agent-skills',
        type: 'skill-md',
        description:
          'Publish an agent skills discovery index per Agent Skills Discovery RFC v0.2.0',
        url: `${BASE_SKILLS_URL}/agent-skills/SKILL.md`,
        digest: 'sha256:2cdda60ea052eb8af4ae8a4d96dc0d173151d5386ee724a4e98f93ed21adbae5',
      },
      {
        name: 'webmcp',
        type: 'skill-md',
        description: 'Expose site tools to AI agents via the browser using the WebMCP API',
        url: `${BASE_SKILLS_URL}/webmcp/SKILL.md`,
        digest: 'sha256:b1afc5519f25817fe2cafe7c60a8aecfb9358033812dd89e4c9dd50cdb106e1c',
      },
      {
        name: 'markdown-negotiation',
        type: 'skill-md',
        description: 'Return HTML responses as markdown when agents request Accept: text/markdown',
        url: `${BASE_SKILLS_URL}/markdown-negotiation/SKILL.md`,
        digest: 'sha256:a230108a9586ed530945b91d49d86163e38a6687ad1b08f60ec08e2cb99f1ed7',
      },
    ],
  };

  return NextResponse.json(index, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
