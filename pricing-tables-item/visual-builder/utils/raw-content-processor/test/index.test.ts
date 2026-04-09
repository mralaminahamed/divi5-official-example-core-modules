import { rawContentProcessor } from '../index';

describe('rawContentProcessor', () => {
  describe('Basic functionality', () => {
    test('should process content with plus indicators', () => {
      const input = '+ Feature 1<br />+ Feature 2';
      const expected = '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li><span>Feature 2</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should process content with minus indicators', () => {
      const input = '- Feature 1<br />- Feature 2';
      const expected =
        '<ul class="et_pb_pricing"><li class="et_pb_not_available"><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should process mixed plus and minus indicators', () => {
      const input = '+ Available feature<br />- Unavailable feature<br />+ Another available';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Available feature</span></li><li class="et_pb_not_available"><span>Unavailable feature</span></li><li><span>Another available</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });
  });

  describe('HTML tag processing', () => {
    test('should convert <p> tags to newlines', () => {
      const input = '<p>+ Feature 1</p><p>- Feature 2</p>';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should convert <br> tags to newlines', () => {
      const input = '+ Feature 1<br>- Feature 2';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should convert <br/> tags to newlines', () => {
      const input = '+ Feature 1<br/>- Feature 2';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should convert <br /> tags to newlines', () => {
      const input = '+ Feature 1<br />- Feature 2';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle mixed HTML tags', () => {
      const input = '<p>+ Feature 1</p><br>- Feature 2<br/>+ Feature 3';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li><li><span>Feature 3</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle <p> tags with attributes', () => {
      const input = '<p class="test">+ Feature 1</p><p id="item">- Feature 2</p>';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle all <br> tag variations', () => {
      const input = '+ Feature 1<br>- Feature 2<br/>+ Feature 3<br />- Feature 4';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li><li><span>Feature 3</span></li><li class="et_pb_not_available"><span>Feature 4</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle <br> tags with attributes', () => {
      const input = '+ Feature 1<br class="test">- Feature 2<br id="break" />+ Feature 3';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li><li><span>Feature 3</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle case-insensitive HTML tags', () => {
      const input = '<P>+ Feature 1</P><BR>- Feature 2<Br />+ Feature 3';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li><li><span>Feature 3</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle content with literal newlines', () => {
      const input = '+ Feature 1\n- Feature 2\n+ Feature 3';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li><li><span>Feature 3</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });
  });

  describe('Content without indicators', () => {
    test('should process content without plus/minus indicators', () => {
      const input = 'Basic feature<br />Another feature';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Basic feature</span></li><li><span>Another feature</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should process content with <p> tags and no indicators', () => {
      const input = '<p>Basic feature</p><p>Another feature</p>';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Basic feature</span></li><li><span>Another feature</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });
  });

  describe('Edge cases', () => {
    test('should handle empty string', () => {
      const input = '';
      const expected = '';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle null input', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const input = null as any;
      const expected = '';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle undefined input', () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-undefined
      const input = undefined as any;
      const expected = '';

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle content with only whitespace', () => {
      const input = '   <br />   <br />   ';
      const expected = '';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle content with empty lines', () => {
      const input = '+ Feature 1<br /><br />- Feature 2';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle content with leading/trailing whitespace', () => {
      const input = '  + Feature 1  <br />  - Feature 2  ';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });
  });

  describe('Special characters and formatting', () => {
    test('should handle content with special characters', () => {
      const input = '+ Feature with "quotes"<br />- Feature with & symbols';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature with "quotes"</span></li><li class="et_pb_not_available"><span>Feature with & symbols</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle content with numbers', () => {
      const input = '+ Feature 1<br />- Feature 2<br />+ Feature 3';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Feature 1</span></li><li class="et_pb_not_available"><span>Feature 2</span></li><li><span>Feature 3</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle single character content', () => {
      const input = '+ A<br />- B';
      const expected =
        '<ul class="et_pb_pricing"><li><span>A</span></li><li class="et_pb_not_available"><span>B</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });
  });

  describe('Return original content when no list items', () => {
    test('should return original content when no valid list items found', () => {
      const input = '<div>Some other content</div>';
      const expected = '<div>Some other content</div>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should return original content when only empty items', () => {
      const input = '<br /><br />';
      const expected = '';

      expect(rawContentProcessor(input)).toBe(expected);
    });
  });

  describe('Real-world scenarios', () => {
    test('should handle typical pricing table content', () => {
      const input = '<p>+ 24/7 Support</p><p>- Advanced Analytics</p><p>+ Basic Features</p>';
      const expected =
        '<ul class="et_pb_pricing"><li><span>24/7 Support</span></li><li class="et_pb_not_available"><span>Advanced Analytics</span></li><li><span>Basic Features</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });

    test('should handle content from WYSIWYG editor', () => {
      const input = '+ Email Support<br />- Phone Support<br />+ Live Chat';
      const expected =
        '<ul class="et_pb_pricing"><li><span>Email Support</span></li><li class="et_pb_not_available"><span>Phone Support</span></li><li><span>Live Chat</span></li></ul>';

      expect(rawContentProcessor(input)).toBe(expected);
    });
  });
});
